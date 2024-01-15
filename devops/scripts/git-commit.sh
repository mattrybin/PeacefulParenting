#!/bin/bash

source ./.env.local

SCRIPT_DIR=$(dirname "$BASH_SOURCE")
source "$SCRIPT_DIR/utils/notion_move_ticket.sh"
source "$SCRIPT_DIR/utils/github_assign_state.sh"
source "$SCRIPT_DIR/utils/validate_working_directory.sh"
source "$SCRIPT_DIR/utils/send_slack_review.sh"

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
        echo "1 - Quit"
        echo "2 - Ask for review"
        read -p "Your option: " option

        case $option in
            1 )
                echo "Exiting..."
                exit 0;;
            2 )
                notion_move_ticket "Review"
                github_assign_state
                break;;
            * )
                echo "Invalid option. Enter 1 or 2.";;
        esac
    done
}

exit_if_development_branch
validate_working_directory
review_select_option
send_slack_review