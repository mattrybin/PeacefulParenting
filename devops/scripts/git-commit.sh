#!/bin/bash

source ./.env.local

SCRIPT_DIR=$(dirname "$BASH_SOURCE")
source "$SCRIPT_DIR/utils/notion_move_ticket.sh"
source "$SCRIPT_DIR/utils/github_assign_state.sh"
source "$SCRIPT_DIR/utils/validate_working_directory.sh"
source "$SCRIPT_DIR/utils/send_to_slack_review.sh"

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
                # echo "Asking for review..."
                # PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
                # PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)

                # # Get PR current labels
                # PR_LABELS=$(gh pr view $PR_NUMBER --json labels --jq '.labels[]?.name' | tr -d '"')

                # # Check if "DRAFT" label exists
                # if [[ $PR_LABELS =~ "DRAFT" ]]; then
                #     # Removes the "DRAFT" label from this PR
                #     gh pr edit "$PR_NUMBER" --remove-label "DRAFT"
                # fi

                # # Check if "REVIEW" label does not exist
                # if [[ ! $PR_LABELS =~ "REVIEW" ]]; then
                #     # Adding "REVIEW" label to this PR
                #     gh pr edit "$PR_NUMBER" --add-label "REVIEW"
                # fi
                
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