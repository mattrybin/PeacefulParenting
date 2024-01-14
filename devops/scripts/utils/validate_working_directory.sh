#!/bin/bash
function list_changed_files {
    # Get file with highest number of changes
    full_path=$(git diff --numstat | awk '{print $1+$2, $3}' | sort -nr | awk 'NR==1{print $2}')
    
    # Limit to two directories back
    first_file=$(echo $full_path | awk -F"/" '{OFS="/"; if(NF>2) print $(NF-2),$(NF-1),$NF; else print $NF}')
    
    # Check the length of the file path, if it's too long (e.g., longer than 50 characters), limit to one directory back
    if (( ${#first_file} > 25 )); then
        first_file=$(echo $full_path | awk -F"/" '{OFS="/"; if(NF>1) print $(NF-1),$NF; else print $NF}')
    fi

    # Get array of changed files
    changed_files_arr=($(git diff --name-only))

    # Get length of array
    arr_length=${#changed_files_arr[@]}

    # Get total lines changed
    total_lines_changed=$(git diff --numstat | awk '{ total += $1 + $2 } END { print total }')
    
    # Check if multiple files have been changed
    if (( arr_length > 1 )); then
       other_files_count=$((arr_length-1))
       echo "${first_file} and ${other_files_count} other files changed with a total of ${total_lines_changed} lines changed"
    else
       # Only one file has been changed
       echo "${first_file} changed with ${total_lines_changed} lines changed"
    fi
}

function validate_working_directory {
    commit_message=$(list_changed_files)
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
                    git add --all && git commit -m "${commit_message}" && git push origin "$current_branch"
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