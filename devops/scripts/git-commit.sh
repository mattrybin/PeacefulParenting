#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/validate_working_directory.sh

function exit_if_development_branch {
    current_branch=$(git branch --show-current)

    if [ "$current_branch" == "development" ]; then
        echo "You're on the 'development' branch. Exiting the script."
        exit 1
    fi
}

function review_select_option {
    PR_NUMBER=$(gh pr view --json number --jq .number)

    while true; do
        echo "Select an option:"
        echo "0 - Quit"
        echo "1 - Ask for review"
        read -p "Your option: " option

        case $option in
            0 )
                echo "Exiting..."
                exit 0;;
            1 )
                echo "Asking for review..."
                # Adding "REVIEW" label to this PR
                gh pr update "$PR_NUMBER" --add-label "REVIEW" --repo origin
                
                # Removing "DRAFT" label from this PR
                gh pr update "$PR_NUMBER" --remove-label "DRAFT" --repo origin
                break;;
            * )
                echo "Invalid option. Enter 0 or 1.";;
        esac
    done
}

exit_if_development_branch
validate_working_directory
review_select_option