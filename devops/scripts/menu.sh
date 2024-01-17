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
    labels=("Quit" "New Pull Request" "Checkout Pull Request" "Go to GitHub" "Go to Notion" "Go to Slack")
    commands=("quit" "new-pr" "git-checkout" "go-github" "go-notion" "go-slack")
else
    labels=("Quit" "Commit to Pull Request" "Merge Pull Request" "Ask for Help" "Ask for Review" "Go to GitHub PR" "Go to Notion Ticket" "Go Development Branch")
    commands=("quit" "commit-to-pr" "merge-pr" "ask-for-help" "ask-for-review" "go-github-pr" "go-notion-ticket" "git-checkout-development")
fi

# Display the menu
for i in ${!labels[@]}; do
  echo -e "${GREEN}$((i+1)). ${labels[$i]}${NC}"
done

# Prompt the user to make a selection
echo -e "${BLUE}Enter the number for the command you want to run:${NC}"
read selection

# Validate the selection and if valid, execute the single Git command
if [[ $selection -ge 1 && $selection -le ${#commands[@]} ]]; then
  command=${commands[$((selection-1))]}
  
  # Do not attempt to execute 'quit' as a command, just exit
  if [[ $command == "quit" ]]; then
    echo -e "${BLUE}Quitting...${NC}"
    exit 0
  fi
  
  echo -e " "
  echo -e "${BLUE}###${NC}"
  echo -e "${BLUE}Running '${labels[$((selection-1))]}'...${NC}"
  make $command
else
  echo -e "${RED}Invalid selection${NC}"
fi