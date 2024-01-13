#!/bin/bash

# Constants
REPO_URL="https://github.com/mattrybin/PeacefulParenting"
FEATURE_BRANCH_PREFIX="st-"
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

# Check for necessary Git variables
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Please run this script at the root of your Git directory"
    exit 1
fi

git_name=$(git config user.name)
git_name=${git_name//[$'\t\r\n']}  # trim whitespaces
if [ -z "${git_name}" ]; then
    echo "${BOLD}You haven't set your Git name locally. Set it before proceeding further.${NORMAL}"
    exit 1
fi

git_email=$(git config user.email)
git_email=${git_email//[$'\t\r\n']}  # trim whitespaces
if [ -z "${git_email}" ]; then
    echo "${BOLD}You haven't set your Git email locally. Set it before proceeding further.${NORMAL}"
    exit 1
fi

# Validate GitHub CLI and check if authenticated
if ! command -v gh &> /dev/null; then
    echo "${BOLD}GitHub CLI has not been found. Please install it before proceeding further.${NORMAL}"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo "${BOLD}You are not logged in to GitHub CLI. Please authenticate with 'gh auth login'.${NORMAL}"
    exit 1
fi

# Check if there are changes in working directory or changes in the index
if [[ "$(git status --porcelain)" != "" ]]; then
    current_branch=$(git symbolic-ref --short HEAD)
    echo "${BOLD}Current branch '${current_branch}' has uncommitted changes. Would you like to stash them now?${NORMAL}"
    read -p "Stash changes? (y/n) " stash_yn
    case $stash_yn in
        [Yy]* )
            git stash push -u -m "${current_branch}"
            if [ $? -ne 0 ]; then
                echo "Error stashing changes."
                exit 1
            fi
            ;;
        [Nn]* )
            echo "Please commit, stash or discard changes before continuing."
            exit 1
            ;;
        * )
            echo "Please answer (y)es or (n)o."
            exit 1
            ;;
    esac
fi


# Check if user is on development branch
if [[ "$(git symbolic-ref --short HEAD)" != "development" ]]; then
    echo "${BOLD}You aren't currently on the 'development' branch. Would you like to switch now?${NORMAL}"
    read -p "Switch to 'development' branch? (y/n) " switch_yn
    case $switch_yn in
        [Yy]* )
            git checkout development
            if [ $? -ne 0 ]; then
                echo "Error switching to 'development' branch. Please verify the branch exists."
                exit 1
            fi
            ;;
        [Nn]* )
            echo "Please switch to the 'development' branch before creating a new feature branch."
            exit 1
            ;;
        * )
            echo "Please answer (y)es or (n)o"
            exit 1
            ;;
    esac
fi

# Check if development branch is up to date with remote
git remote update
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL != $REMOTE ]; then
    echo -e "${BOLD}Your development branch is not up to date with the remote branch. Please update your branch.${NORMAL}"
exit 1
fi

NOTION_API_KEY="secret_ND2qydCVvlIvQuRAhuMFYvCnmJ9CAvcIc0LNvtYfu0W"
DATABASE_ID="e3a6cdc2a2694ef9b824444ac5d9a0e3"

# Get tasks from Notion and convert to an array of JSON objects
declare -a JSON_OBJECTS
declare -a PLAIN_TEXTS
while IFS= read -r line; do
  JSON_OBJECTS+=("$line")
  task_title=$(echo "$line" | jq -r '.plain_text')
  PLAIN_TEXTS+=("$task_title")   # change this line
done < <(curl "https://api.notion.com/v1/databases/${DATABASE_ID}/query" \
     -H "Authorization: Bearer ${NOTION_API_KEY}" \
     -H "Notion-Version: 2021-08-16" \
     -X POST -d '{}' | jq -c '.results[] | select(.properties.Status.select.name == "Tasks") | {id: ("PP-" + (.properties.ID.unique_id.number | tostring)), created_time: .created_time, plain_text: .properties.Name.title[0].plain_text, url: .url}')

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
    break
  else
    echo "Invalid choice. Please retry."
  fi
done

# Get the issue ID and confirm branch existence
read -p "Type the issue ID (for example, ${BOLD}123${NORMAL}): " issue_id
if [ "$(git ls-remote --heads origin ${issue_id})" ]; then
    echo "${BOLD}Branch '${issue_id}' already exists. Please use a different issue ID.${NORMAL}"
    echo "See the branch on GitHub: ${REPO_URL}/tree/${issue_id}"
    exit 1
fi

# Validate and confirm full_title
while true; do
    if [[ ${full_title} =~ ^feat: ]]; then # regex checks for "feat:" at the start.
        echo "Full title: ${full_title}"
        read -p "Confirm title? (y/n) " yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) echo "Let's try again";;
            * ) echo "Please answer (y)es or (n)o";;
        esac
    else
        echo "${BOLD}Title validation failed. It should start with 'feat: '. Please retry.${NORMAL}"
        break
    fi
done

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

echo "Selected title: ${full_title}"
echo "Selected ID: ${issue_id}"
# # Create and checkout branch, make a commit, and push to remote
# git checkout -b ${issue_id} # use issue_id as a branch name
# git commit --allow-empty -m "${full_title}" # full_title as a commit message
# git push origin ${issue_id} # use issue_id as a branch name

# # Create a pull request with the "DRAFT" label
# gh pr create --title "${full_title}" --body "Pull request for ${full_title}." --label DRAFT -B development