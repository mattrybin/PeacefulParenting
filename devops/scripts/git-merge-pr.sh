#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/validate_working_directory.sh


function check_current_pr_status {
    current_branch=$(git branch --show-current)

    if [[ -z "$current_branch" ]]; then
        echo "No branch currently checked out."
        return 1
    fi

    pr=$(gh pr list --head "$current_branch" --json url --jq '.[0].url')

    if [[ -z "$pr" ]]; then
        echo "No Pull Request associated with the current branch."
        return 1
    fi

    status=$(gh pr checks $current_branch)

    echo "Checks Status: $status"

    if [[ $status == *"FAIL"* ]]; then
        echo "PR for '$current_branch' has failed checks."
    elif [[ $status == *"SUCCESS"* ]]; then
        echo "PR for '$current_branch' has passed checks."
    elif [[ $status == *"PENDING"* ]]; then
        echo "PR for '$current_branch' checks are pending."
    else
        echo "PR for '$current_branch' checks haven't started yet or no checks are defined."
    fi
}

validate_working_directory
check_current_pr_status