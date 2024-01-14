#!/bin/bash

# Constants
REPO_URL="https://github.com/mattrybin/PeacefulParenting"
BOLD=$(tput bold)
NORMAL=$(tput sgr0)
NOTION_API_KEY="secret_ND2qydCVvlIvQuRAhuMFYvCnmJ9CAvcIc0LNvtYfu0W"
DATABASE_ID="e3a6cdc2a2694ef9b824444ac5d9a0e3"

declare issue_id
declare full_title

function check_git_dir {
    # Check for necessary Git variables
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "Please run this script at the root of your Git directory"
        exit 1
    fi
}

function validate_git_config {
    for field in name email; do
        git_value=$(git config --get --global user.$field)
        git_value=${git_value//[$'\t\r\n']}  # trim whitespaces

        if [ -z "${git_value}" ]; then
            echo "${BOLD}You haven't set your Git $field globally. Set it before proceeding further.${NORMAL}"
            echo "Please run the following command to set your Git $field:"
            echo "git config --global user.$field \"your_$field\""
            exit 1
        else
            declare "git_$field=$git_value"
            export git_name git_email
        fi
    done
}

function validate_github_cli {
    # Validate GitHub CLI and check if authenticated
    if ! command -v gh >/dev/null 2>&1; then
        echo >&2 "${BOLD}GitHub CLI has not been found. Please install it before proceeding further.${NORMAL}"
        exit 1
    fi

    if ! gh auth status >/dev/null 2>&1; then
        echo >&2 "${BOLD}You are not logged in to GitHub CLI. Please authenticate with 'gh auth login'.${NORMAL}"
        exit 1
    fi
}

function validate_working_directory {
    # Check if there are changes in working directory or changes in the index
    if [[ "$(git status --porcelain)" != "" ]]; then
        current_branch=$(git symbolic-ref --short HEAD)
        echo "${BOLD}Current branch '${current_branch}' has uncommitted changes.${NORMAL}"
        
        while true; do
            echo "Select an option:"
            echo "1 - Quit / Do nothing."
            echo "2 - Commit and push changes with a standard commit."
            echo "3 - Stash changes."
            echo "4 - Hard reset the branch to remote version."
            read -p "Your option: " option

            case $option in
                1 )
                    echo "Exiting without performing any operations..."
                    exit 1;;
                2 )
                    git add --all && git commit -m "save: ${current_branch}" && git push origin "$current_branch"
                    if [ $? -ne 0 ]; then
                        echo "Error while committing/pushing changes."
                    else
                        echo "Changes have been committed and pushed successfully."
                    fi
                    break;;
                3 )
                    git stash push -u -m "${current_branch}"
                    if [ $? -ne 0 ]; then
                        echo "Error stashing changes."
                    else
                        echo "Changes have been stashed successfully."
                    fi
                    break;;
                4 )
                    git fetch origin
                    git reset --hard origin/"$current_branch"
                    if [ $? -ne 0 ]; then
                        echo "Error resetting the branch."
                    else
                        echo "Branch has been reset to the remote version successfully."
                    fi
                    break;;
                * )
                    echo "Invalid option. Enter 1, 2, 3 or 4.";;
            esac
        done
    fi
}

function validate_on_development_branch {
    # Check if user is on the development branch
    if [[ "$(git symbolic-ref --short HEAD)" != "develop" ]]; then
        echo "${BOLD}You aren't currently on the 'development' branch.${NORMAL}"
        
        while true; do
            echo "Select an option:"
            echo "1 - Quit / Do nothing."
            echo "2 - Switch to the 'development' branch."
            read -p "Your option: " option

            case $option in
                1 )
                    echo "Exiting without switching branch..."
                    exit 1;;
                2 )
                    git checkout development
                    if [ $? -ne 0 ]; then
                        echo "Error switching to the 'development' branch. Please verify the branch exists."
                    else
                        echo "Switched to the 'development' branch."
                    fi
                    break;;
                * )
                    echo "Invalid option. Enter 1 or 2.";;
            esac
        done
    fi
}

function validate_dev_branch_up_to_date {
    # Update remote references
    git remote update
    
    # Configure upstream
    UPSTREAM=${1:-'@{u}'}
    
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse "$UPSTREAM")
    BASE=$(git merge-base @ "$UPSTREAM")

    if [ $LOCAL != $REMOTE ]; then
        echo "${BOLD}Your 'development' branch is not up-to-date with the remote branch.${NORMAL}"
        
        while true; do
            echo "Select an option:"
            echo "1 - Quit / Do nothing."
            echo "2 - Pull latest changes."
            read -p "Your option: " option

            case $option in
                1 )
                    echo "Exiting without pulling changes..."
                    exit 1;;
                2 )
                    git pull --rebase
                    if [ $? -ne 0 ]; then
                        echo "Error pulling latest changes. Please ensure no merge conflicts or unstaged changes are present."
                    else
                        echo "Successfully pulled latest changes."
                    fi
                    break;;
                * )
                    echo "Invalid option. Enter 1 or 2.";;
            esac
        done
    fi
}

function validate_notion_credentials {
    # Try to fetch a single record from Notion
    RESPONSE=$(curl "https://api.notion.com/v1/databases/${DATABASE_ID}/query" \
        -H "Authorization: Bearer ${NOTION_API_KEY}" \
        -H "Notion-Version: 2021-08-16" \
        -X POST -d '{"page_size": 1}' \
        -s \
        -o /dev/null \
        -w "%{http_code}")

    # Check status code
    if [ $RESPONSE -eq 200 ]; then
        echo "${BOLD}NOTION_API_KEY and DATABASE_ID appear to be valid.${NORMAL}"
    else
        echo "${BOLD}The response was not successful. Please verify that NOTION_API_KEY and DATABASE_ID are correct.${NORMAL}"
        exit 1
    fi
}

function select_notion_task {
    # Get tasks from Notion and convert to an array of JSON objects
    declare -a JSON_OBJECTS
    declare -a PLAIN_TEXTS
    while IFS= read -r line; do
        JSON_OBJECTS+=("$line")
        task_title=$(echo "$line" | jq -r '.plain_text')
        PLAIN_TEXTS+=("$task_title")   
    done < <(curl "https://api.notion.com/v1/databases/${DATABASE_ID}/query" \
        -H "Authorization: Bearer ${NOTION_API_KEY}" \
        -H "Notion-Version: 2021-08-16" \
        -X POST -d '{}' | jq -c '.results[] | select(.properties.Status.select.name == "Tasks") | {id: ("PP-" + (.properties.ID.unique_id.number | tostring)), plain_text: .properties.Name.title[0].plain_text, url: .url}')

    # Display each title and prompt for selection
    echo "Please select a task:"
    for i in "${!PLAIN_TEXTS[@]}"; do 
        echo "$((i+1))) ${PLAIN_TEXTS[$i]}"
    done

    while true; do
        read -p "Enter choice: " REPLY
        if [[ -n $REPLY && $REPLY -le ${#PLAIN_TEXTS[@]} && $REPLY -ge 1 ]]; then
            INDEX=$((REPLY-1))   # Get chosen index
            issue_id=$(echo "${JSON_OBJECTS[$INDEX]}" | jq -r '.id')
            full_title=$(echo "${JSON_OBJECTS[$INDEX]}" | jq -r '.plain_text')
            echo "You have selected: ${full_title} with ID: ${issue_id}"
            break
        else
            echo "Invalid choice. Please retry."
        fi
    done
}

# # Get the issue ID and confirm branch existence
# read -p "Type the issue ID (for example, ${BOLD}123${NORMAL}): " issue_id
# if [ "$(git ls-remote --heads origin ${issue_id})" ]; then
#     echo "${BOLD}Branch '${issue_id}' already exists. Please use a different issue ID.${NORMAL}"
#     echo "See the branch on GitHub: ${REPO_URL}/tree/${issue_id}"
#     exit 1
# fi

# # Validate and confirm feature title
# while true; do
#     read -p "Type the feature title (for example, ${BOLD}feat: add filter to table${NORMAL}): " feat_title
#     if [[ ${feat_title} =~ ^feat: ]]; then # removed ':' from regex
#         full_title="feat(${issue_id}): ${feat_title#feat: }" # Updated format
#         echo "Full title: ${full_title}"
#         read -p "Confirm title? (y/n) " yn
#         case $yn in
#             [Yy]* ) break;;
#             [Nn]* ) echo "Let's try again";;
#             * ) echo "Please answer (y)es or (n)o";;
#         esac
#     else
#         echo "${BOLD}Title validation failed. It should start with 'feat: '. Please retry.${NORMAL}"
#     fi
# done

# # Create and checkout branch, make a commit, and push to remote
# git checkout -b ${issue_id} # use issue_id as a branch name
# git commit --allow-empty -m "${full_title}" # full_title as a commit message
# git push origin ${issue_id} # use issue_id as a branch name

# # Create a pull request with the "DRAFT" label
# gh pr create --title "${full_title}" --body "Pull request for ${full_title}." --label DRAFT -B development







check_git_dir

validate_git_config
validate_github_cli
validate_working_directory
validate_on_development_branch
validate_dev_branch_up_to_date
validate_notion_credentials

select_notion_task
echo "Selected title: ${full_title}"
echo "Selected title: ${issue_id}"