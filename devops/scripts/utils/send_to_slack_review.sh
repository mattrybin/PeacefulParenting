
source ../../../.env.local

function send_to_slack {
    local pr_link=$1
    local pr_title="$2"
    local data='{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*<'"$pr_link"'|'"$pr_title"'>*"
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": { 
                            "type": "plain_text", 
                            "text": "Ready for Review" 
                        }, 
                        "url": "'"$pr_link"'"
                    }
                ]
            }
        ]
    }'
    curl -X POST -H 'Content-type: application/json' --data "${data}" $SLACK_WEBHOOK_URL
}