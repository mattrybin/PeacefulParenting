#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/validate_working_directory.sh


function check_current_pr_status {
    current_branch=$(git branch --show-current)

    if [[ -z "$current_branch" ]]; then
        echo "No branch currently checked out."
        return 1
    fi

    pr_number=$(gh pr list --base "$current_branch" --json number --jq '.[0].number')

    if [[ -z "$pr_number" ]]; then
        echo "No Pull Request associated with the current branch."
        return 1
    fi

    # Fetch Status
    pr_status=$(gh api -X GET repos/:owner/:repo/commits/$current_branch/check-runs --jq '.check_runs[] | .conclusion' | sort | uniq)

    echo $pr_status

    if [[ $pr_status =~ "failure" ]]; then
        echo "PR #$pr_number on '$current_branch' has failed checks."
    elif [[ $pr_status == "success" ]]; then
        echo "PR #$pr_number on '$current_branch' has passed checks."
    else
        echo "PR #$pr_number on '$current_branch' checks haven't finished yet or no checks are defined."
    fi
}

validate_working_directory
check_current_pr_status