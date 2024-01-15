source ./.env.local

function send_slack_help {
    PR_NUMBER=$(gh pr view --json number --jq .number)
    PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
    PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)
    local data='{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Asking for help: *<'"$PR_LINK"'|'"$PR_TITLE"'>*"
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": { 
                            "type": "plain_text", 
                            "text": "Help" 
                        }, 
                        "url": "'"$PR_LINK"'"
                    }
                ]
            }
        ]
    }'
    curl -X POST -H 'Content-type: application/json' --data "${data}" $SLACK_WEBHOOK_URL
}