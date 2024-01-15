source ./.env.local

function send_slack_done {
    PR_NUMBER=$(gh pr view --json number --jq .number)
    PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
    PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)
    local data='{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*<'"$PR_LINK"'|'"$PR_TITLE"'>* is done"
                }
            }
        ]
    }'
    curl -X POST -H 'Content-type: application/json' --data "${data}" $SLACK_WEBHOOK_URL
}