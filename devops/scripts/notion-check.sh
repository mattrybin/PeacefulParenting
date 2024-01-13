#!/bin/bash

NOTION_API_KEY="secret_ND2qydCVvlIvQuRAhuMFYvCnmJ9CAvcIc0LNvtYfu0W"
DATABASE_ID="e3a6cdc2a2694ef9b824444ac5d9a0e3"
REPO_URL="your-repository-url"  # Replace with your repository URL

# Get tasks from Notion and convert to an array of JSON objects
declare -a JSON_OBJECTS
declare -a PLAIN_TEXTS
while IFS= read -r line; do
  JSON_OBJECTS+=("$line")
  task_title=$(echo "$line" | jq -r '.plain_text')
  PLAIN_TEXTS+=("$task_title")   # change this line
done < <(curl "https://api.notion.com/v1/databases/${DATABASE_ID}/query" \
     -H "Authorization: Bearer ${NOTION_API_KEY}" \
     -H "Notion-Version: 2021-08-16" \
     -X POST -d '{}' | jq -c '.results[] | select(.properties.Status.select.name == "Tasks") | {id: ("PP-" + (.properties.ID.unique_id.number | tostring)), created_time: .created_time, plain_text: .properties.Name.title[0].plain_text, url: .url}')

# Display each title and prompt for selection
echo "Please select a task:"
for i in "${!PLAIN_TEXTS[@]}"; do 
  echo "$((i+1))) ${PLAIN_TEXTS[$i]}"
done

while true; do
  read -p "Enter choice: " REPLY
  if [[ -n $REPLY && $REPLY -le ${#PLAIN_TEXTS[@]} && $REPLY -ge 1 ]]; then
    INDEX=$((REPLY-1))   # Get chosen index
    issue_id=$(echo "${JSON_OBJECTS[$INDEX]}" | jq -r '.id')
    full_title=$(echo "${JSON_OBJECTS[$INDEX]}" | jq -r '.plain_text')
    break
  else
    echo "Invalid choice. Please retry."
  fi
done

# # Check for branch existence
# if [ "$(git ls-remote --heads origin ${issue_id})" ]; then
#   echo "Branch '${issue_id}' already exists. Please use a different issue ID."
#   echo "See the branch on GitHub: ${REPO_URL}/tree/${issue_id}"
#   exit 1
# fi

# Display selected feature title
echo "Selected title: ${full_title}"
echo "Selected title: ${issue_id}"