#!/bin/bash

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function current_branch() {
  echo $(git rev-parse --abbrev-ref HEAD)
}

# Define the Git commands
if [[ $(current_branch) == "development" ]]; then
    commands=("quit" "new-pr" "checkout-pr" "go-github" "go-notion" "go-slack")
else
    commands=("quit" "commit-to-pr" "merge-pr" "ask-for-help" "ask-for-review" "go-github-pr" "go-notion-ticket" "go-slack")
fi

# Display the menu
for i in ${!commands[@]}; do
  echo -e "${GREEN}$((i+1)). ${commands[$i]}${NC}"
done

# Prompt the user to make a selection
echo -e "${BLUE}Enter the number for the command you want to run:${NC}"
read selection

# Validate the selection and if valid, execute the single Git command
if [[ $selection -ge 1 && $selection -le ${#commands[@]} ]]; then
  command=${commands[$((selection-1))]}
  echo -e " "
  echo -e "${BLUE}###${NC}"
  echo -e "${BLUE}Running '$command'...${NC}"
  make $command
else
  echo -e "${RED}Invalid selection${NC}"
fi