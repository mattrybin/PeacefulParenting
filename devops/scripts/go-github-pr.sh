#!/bin/bash

function open_specific_pr() {
  # Assign the PR number. Replace '1' with your specific PR number
  PR_NUMBER=$(gh pr view --json number --jq .number)

  # Get the PR URL associated with the PR number
  PR_LINK=$(gh pr view $PR_NUMBER --json url -q '.url')

  if [ "${PR_LINK}" = "null" ]; then
    echo "Could not find a PR for PR number: ${PR_NUMBER}"
    return 1
  fi
  
  # Open the PR link in the default browser
  open $PR_LINK
}

open_specific_pr