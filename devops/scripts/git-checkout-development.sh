#!/bin/bash

SCRIPT_DIR=$(dirname "$BASH_SOURCE")
source "$SCRIPT_DIR/utils/validate_working_directory.sh"

update_development_branch() {
  # Ensure script is run within a git project
  if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
      echo "This script must be run from inside a git repository."
      exit 1
  fi

  # Fetch the latest information from the remote repository
  echo "Fetching the latest information from the remote repository..."
  git fetch

  # Checkout to the "development" branch
  echo "Switching to the \"development\" branch..."
  git checkout development

  # Pull the latest updates for the branch from the remote repository
  echo "Pulling the latest code..."
  git pull

  echo "The \"development\" branch is now up-to-date."
}

validate_working_directory
update_development_branch