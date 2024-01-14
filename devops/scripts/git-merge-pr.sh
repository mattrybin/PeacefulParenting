#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/validate_working_directory.sh


function check_current_pr_status {
    current_branch=$(git branch --show-current)

    if [[ -z "$current_branch" ]]; then
        echo "No branch currently checked out."
        return 1
    fi

    pr_number=$(gh pr list --head "$current_branch" --json number --jq '.[0].number')

    if [[ -z "$pr_number" ]]; then
        echo "No Pull Request associated with the current branch."
        return 1
    fi

    # Fetch Status
    pr_status=$(gh pr view "$pr_number" --json statusCheckRollup --jq '.statusCheckRollup.state')

    echo "Checks Status: $pr_status"

    if [[ $pr_status == "FAILURE" ]]; then
        echo "PR #$pr_number on '$current_branch' has failed checks."
    elif [[ $pr_status == "SUCCESS" ]]; then
        echo "PR #$pr_number on '$current_branch' has passed checks."
    else
        echo "PR #$pr_number on '$current_branch' checks haven't finished yet or no checks are defined."
    fi
}

validate_working_directory
check_current_pr_status