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


function check_pr_checks_until_timeout {
    current_branch=$(git branch --show-current)
    timeout=$((5 * 60))  # 5 minutes
    interval=10  # Check every 10 seconds

    start=$(date +%s)

    while true; do
        now=$(date +%s)
        elapsed=$((now - start))
        if ((elapsed > timeout)); then
            echo "Timeout reached: PR checks aren't all passing after 5 minutes."
            break
        fi

        checks_status=$(gh pr checks $current_branch)
        echo "$checks_status"

        if [[ $checks_status == *"fail"* ]]; then
            echo "Checks have failed."
            break
        elif [[ $checks_status != *"pending"* ]]; then
            echo "All checks have passed."
            break
        fi

        sleep $interval
    done
}

validate_working_directory
sleep 10
check_pr_checks_until_timeout
# check_current_pr_status