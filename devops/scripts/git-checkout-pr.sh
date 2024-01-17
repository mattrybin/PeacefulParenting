#!/bin/bash

SCRIPT_DIR=$(dirname "$BASH_SOURCE")
source "$SCRIPT_DIR/utils/validate_working_directory.sh"

function checkout_pr {
  # Obtain the current PR number
  current_pr_number=$(gh pr view $(git branch --show-current) --json number --jq '.number')

  # Fetch the PRs
  prs=$(gh pr list --limit 100 --json number,title --jq '.[] | "\(.number) \(.title)"')

  # Create an array of PR titles
  options=()
  prtitles=()

  while IFS=" " read -r number title; do
    if [ "$number" != "$current_pr_number" ]; then
      options+=("$number")
      prtitles+=("$title")
    fi
  done <<< "$prs"

  # Display the options and prompt for a selection
  prompt="Please select a PR: "
  counter=0
  echo "[$counter] Quit" # Add Quit option here
  ((counter++)) # Increment counter
  
  for title in "${prtitles[@]}"; do 
    echo "[$counter] $title" # Print title directly
    ((counter++))
  done

  # Prompt for selection
  read -p "$prompt" selection

  # Quit option selected
  if [[ $selection -eq 0 ]]; then
    echo "Quitting..."
    exit 0
  fi

  # Ensure 1 is subtracted for non-zero selection because array indices start from 0
  selected_option=${options[$selection-1]}

  if [[ $selected_option =~ ^[0-9]+ ]]; then
    # The selected option starts with a number, so it's a PR
    pr_number=${selected_option}
    echo "Checking out PR $pr_number..."
    gh pr checkout $pr_number
    echo "Checked out PR $pr_number!"
  else
    echo "Invalid option. Please try again."
  fi
}

function validate_current_branch_up_to_date {
    # Update remote references
    git remote update
    
    # Configure upstream
    current_branch=$(git branch --show-current)
    UPSTREAM=${current_branch:-'@{u}'}
    
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse "$UPSTREAM")
    BASE=$(git merge-base @ "$UPSTREAM")

    if [ $LOCAL != $REMOTE ]; then
        echo "${BOLD}Your current branch '$current_branch' is not up-to-date with the remote branch.${NORMAL}"
        
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


validate_working_directory
checkout_pr
validate_current_branch_up_to_date