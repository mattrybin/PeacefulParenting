#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/validate_working_directory.sh
source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/send_to_slack_review.sh

# function send_to_slack {
#     local pr_link=$1
#     local pr_title="$2"
#     local data='{
#         "blocks": [
#             {
#                 "type": "section",
#                 "text": {
#                     "type": "mrkdwn",
#                     "text": "*<'"$pr_link"'|'"$pr_title"'>*"
#                 }
#             },
#             {
#                 "type": "actions",
#                 "elements": [
#                     {
#                         "type": "button",
#                         "text": { 
#                             "type": "plain_text", 
#                             "text": "Ready for Review" 
#                         }, 
#                         "url": "'"$pr_link"'"
#                     }
#                 ]
#             }
#         ]
#     }'
#     curl -X POST -H 'Content-type: application/json' --data "${data}" $SLACK_WEBHOOK_URL
# }


# Usage

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
                PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
                PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)

                send_to_slack $PR_LINK "$PR_TITLE"

                # Get PR current labels
                PR_LABELS=$(gh pr view $PR_NUMBER --json labels --jq '.labels[]?.name' | tr -d '"')

                # Check if "DRAFT" label exists
                if [[ $PR_LABELS =~ "DRAFT" ]]; then
                    # Removes the "DRAFT" label from this PR
                    gh pr edit "$PR_NUMBER" --remove-label "DRAFT"
                fi

                # Check if "REVIEW" label does not exist
                if [[ ! $PR_LABELS =~ "REVIEW" ]]; then
                    # Adding "REVIEW" label to this PR
                    gh pr edit "$PR_NUMBER" --add-label "REVIEW"
                fi
                
                break;;
            * )
                echo "Invalid option. Enter 0 or 1.";;
        esac
    done
}




exit_if_development_branch
validate_working_directory
review_select_option