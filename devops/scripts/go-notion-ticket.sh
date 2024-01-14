#!/bin/bash

source ./.env.local

# Get tasks from Notion and convert to an array of JSON objects
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
else
  # Display the matching task's URL and open it in a web browser
  echo "Notion task URL: ${TARGET_URL}"
  open "${TARGET_URL}"
fi