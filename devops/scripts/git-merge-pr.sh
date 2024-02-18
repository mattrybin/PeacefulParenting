#!/bin/bash

source ./.env.local

SCRIPT_DIR=$(dirname "$BASH_SOURCE")
source "$SCRIPT_DIR/utils/validate_working_directory.sh"
source "$SCRIPT_DIR/utils/notion_move_ticket.sh"
source "$SCRIPT_DIR/utils/send_slack_done.sh"

function exit_if_development_branch {
    current_branch=$(git branch --show-current)

    if [ "$current_branch" == "development" ]; then
        echo "You're on the 'development' branch. Exiting the script."
        exit 1
    fi
}



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


function check_pr_build_check_until_timeout {
    current_branch=$(git branch --show-current)
    timeout=$((5 * 60))  # 5 minutes
    interval=10  # Check every 10 seconds

    pr_number=$(gh pr view --json number -q '.number' $current_branch)
    start=$(date +%s)

    while true; do
        now=$(date +%s)
        elapsed=$((now - start))
        if ((elapsed > timeout)); then
            echo "Timeout reached: PR 'build' checks aren't all passing after 5 minutes."
            break
        fi

        checks_output=$(gh pr checks $current_branch)
        
        echo $checks_output
        # extract only 'build' checkline
        build_status_line=$(echo "$checks_output" | grep "^Run tests")

        # echo "$build_status_line"

        if [[ $build_status_line == *"fail"* ]]; then
            echo "Build checks have failed."
            break
        elif [[ $build_status_line == *"pass"* ]]; then
            echo "Build checks have passed."
            
            echo "1 - Quit"
            echo "2 - Merge PR into development"

            read -r -p "Choose your action: " action_choice

            # case on user's choice
            case $action_choice in
            1)
                break
                ;;
            2)
                notion_move_ticket "Done"
                send_slack_done
                gh pr merge $pr_number --squash
                git checkout development
                git pull origin development
                break
                ;;
            *)
                echo "Not a valid choice, please choose 1 or 2."
                ;;
            esac

            break
        fi

        sleep $interval
    done
}

exit_if_development_branch
validate_working_directory
sleep 3
check_pr_build_check_until_timeout