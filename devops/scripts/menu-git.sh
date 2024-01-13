#!/bin/bash

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define the Git commands
commands=("git-new-feature" "git-checkout-pr")

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