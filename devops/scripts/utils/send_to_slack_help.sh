function send_to_slack {
    local pr_link=$1
    local pr_title="$2"
    local hook_url=$3
    local data='{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Asking for help: *<'"$pr_link"'|'"$pr_title"'>*"
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
                        "url": "'"$pr_link"'"
                    }
                ]
            }
        ]
    }'
    curl -X POST -H 'Content-type: application/json' --data "${data}" $hook_url
}