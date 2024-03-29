source ./.env.local

notion_move_ticket() {
    # Check status
    if [ "${1}" != "Review" ] && [ "${1}" != "Progress" ] && [ "${1}" != "Done" ]; then
        echo "Status is neither Review, Progress, nor Done"
        exit 1
    else
        echo "Status is either Review, Progress, or Done"
    fi

    # Find task in Notion
    PR_NUMBER=$(gh pr view --json number --jq .number)
    PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
    PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)

    declare -a JSON_OBJECTS
    CURRENT_BRANCH=$(git symbolic-ref --short HEAD) # Getting current git branch

    while IFS= read -r line; do
        JSON_OBJECTS+=("$line")
    done < <(curl "https://api.notion.com/v1/databases/${DATABASE_ID}/query" \
        -H "Authorization: Bearer ${NOTION_API_KEY}" \
        -H "Notion-Version: 2021-08-16" \
        -X POST -d '{}' | jq -c '.results[] | {id: ("PP-" + (.properties.ID.unique_id.number | tostring)), created_time: .created_time, plain_text: .properties.Name.title[0].plain_text, url: .url}')

    TARGET_URL="null"

    for i in "${!JSON_OBJECTS[@]}"; do 
        task_id=$(echo "${JSON_OBJECTS[$i]}" | jq -r '.id')
        
        if [ "$task_id" = "$CURRENT_BRANCH" ]; then
            # If the current title matches the branch name, store the url
            TARGET_URL=$(echo "${JSON_OBJECTS[$i]}" | jq -r '.url')
            break
        fi
    done

    if [ "$TARGET_URL" = "null" ]; then
        echo "No tasks found matching the current branch name: ${CURRENT_BRANCH}"
        exit 1
    else
        # Display the matching task's URL and open it in a web browser
        echo "Notion task URL: ${TARGET_URL}"
        task_id=$(echo $TARGET_URL | awk -F'-' '{print $NF}')
        echo "Task ID: ${task_id}"
    fi

    # Update Notion task status
    update_payload="{
        \"properties\": {
            \"Status\": {
                \"select\": {
                    \"name\": \"${1}\"
                }
            }
        }
    }"

    curl -X PATCH "https://api.notion.com/v1/pages/${task_id}" \
        -H "Authorization: Bearer ${NOTION_API_KEY}" \
        -H "Content-Type: application/json" \
        -H "Notion-Version: 2021-08-16" \
        -d "${update_payload}"
}