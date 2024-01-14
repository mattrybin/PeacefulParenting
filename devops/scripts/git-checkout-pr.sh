#!/bin/bash

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

# # Function to check if the local branch is behind the remote.
# function check_local_branch_status() {
#     # Fetch updates from the remote.
#     git remote update >/dev/null 2>&1

#     # Check the status of the local and remote branches.
#     UPSTREAM=${1:-'@{u}'}
#     LOCAL=$(git rev-parse @)
#     REMOTE=$(git rev-parse "$UPSTREAM")
#     BASE=$(git merge-base @ "$UPSTREAM")

#     if [ $LOCAL = $REMOTE ]; then
#         echo "Current branch is up-to-date with remote."
#     elif [ $LOCAL = $BASE ]; then
#         echo "Current branch is behind remote. Changes exist on the remote."
#     elif [ $REMOTE = $BASE ]; then
#         echo "Current branch is ahead of remote. Not yet pushed to remote."
#     else
#         echo "Current branch and remote have diverged."
#     fi
# }

# function check_and_stash_changes() {
#     # Check if there are changes in working directory or changes in the index
#     if [[ "$(git status --porcelain)" != "" ]]; then
#         current_branch=$(git symbolic-ref --short HEAD)
#         echo "${BOLD}Current branch '${current_branch}' has uncommitted changes. Would you like to stash them now?${NORMAL}"
#         read -p "Stash changes? (y/n) " stash_yn
#         case $stash_yn in
#             [Yy]* )
#                 git stash push -u -m "${current_branch}"
#                 if [ $? -ne 0 ]; then
#                     echo "Error stashing changes."
#                     exit 1
#                 fi
#                 ;;
#             [Nn]* )
#                 echo "Please commit, stash or discard changes before continuing."
#                 exit 1
#                 ;;
#             * )
#                 echo "Please answer (y)es or (n)o."
#                 exit 1
#                 ;;
#         esac
#     fi
# }
# check_and_stash_changes

# # Obtain the current PR number
# current_pr_number=$(gh pr view $(git branch --show-current) --json number --jq '.number')

# # Fetch the PRs
# prs=$(gh pr list --limit 100 --json number,title --jq '.[] | "\(.number) \(.title)"')

# # Create an array of PR titles
# options=()
# prtitles=()
# while IFS=" " read -r number title; do
#     if [ "$number" != "$current_pr_number" ]; then
#         options+=("$number")
#         prtitles+=("$title")
#     fi
# done <<< "$prs"

# # Display the options and prompt for a selection
# prompt="Please select a PR: "
# counter=0
# echo "[$counter] Quit" # Add Quit option here
# ((counter++)) # Increment counter
# for title in "${prtitles[@]}"; do 
#     echo "[$counter] $title" # Print title directly
#     ((counter++))
# done

# # Prompt for selection
# read -p "$prompt" selection

# # Quit option selected
# if [[ $selection -eq 0 ]]; then
#     echo "Quitting..."
#     exit 0
# fi

# # Ensure 1 is subtracted for non-zero selection because array indices start from 0
# selected_option=${options[$selection-1]}

# if [[ $selected_option =~ ^[0-9]+ ]]; then
#     # The selected option starts with a number, so it's a PR
#     pr_number=${selected_option}
#     check_local_branch_status
#     echo "Checking out PR $pr_number..."
#     gh pr checkout $pr_number
#     echo "Checked out PR $pr_number!"
# else
#     echo "Invalid option. Please try again."
# fi

validate_working_directory