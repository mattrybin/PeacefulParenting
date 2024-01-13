#!/bin/bash

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

# Fetch the PRs
prs=$(gh pr list --limit 100 --json number,title --jq '.[] | "\(.number) \(.title)"')

# Create an array of PR titles
options=("Quit")
while IFS= read -r line; do
    options+=("$line")
done <<< "$prs"

# Display the options and prompt for a selection
prompt="Please select a PR: "
counter=0
for option in "${options[@]}"; do 
    echo "[$counter] pr-$option"
    ((counter++))
done

read -p "$prompt" selection

# Check what was selected and subtract 1 for correct array indexing
selected_option=${options[$selection]}

if [[ $selected_option == "Quit" ]]; then
    exit 1
elif [[ $selected_option =~ ^[0-9]+ ]]; then
    # The selected option starts with a number, so it's a PR
    pr_number=${selected_option%% *}
    echo "Checking out PR $pr_number..."
    gh pr checkout $pr_number
    echo "Checked out PR $pr_number!"
else 
    echo "Invalid option. Please try again."
fi