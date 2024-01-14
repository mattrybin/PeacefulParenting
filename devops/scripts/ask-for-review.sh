#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/send_to_slack_review.sh
source ./.env.local

PR_NUMBER=$(gh pr view --json number --jq .number)
PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)

send_to_slack "$PR_LINK" "$PR_TITLE" "$SLACK_WEBHOOK_URL"