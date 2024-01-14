#!/bin/bash

source /Users/mattrybin/SOFTWARE/mattrybin/PeacefulParenting/devops/scripts/utils/validate_working_directory.sh

function exit_if_development_branch {
    current_branch=$(git branch --show-current)

    if [ "$current_branch" == "development" ]; then
        echo "You're on the 'development' branch. Exiting the script."
        exit 1
    fi
}

exit_if_development_branch
validate_working_directory