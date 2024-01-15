#!/bin/bash

SCRIPT_DIR=$(dirname "$BASH_SOURCE")
source "$SCRIPT_DIR/utils/notion_move_ticket.sh"
source "$SCRIPT_DIR/utils/github_assign_state.sh"
source "$SCRIPT_DIR/utils/send_slack_review.sh"

notion_move_ticket "Review"
github_assign_state
send_slack_review