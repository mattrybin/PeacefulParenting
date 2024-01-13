#!/bin/bash

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define the Make commands
commands=("setup-environment" "setup-hosts" "setup-ssl" "setup-packages")

# Display the menu
echo -e "${GREEN}1. Run all setup commands${NC}"
for i in ${!commands[@]}; do
  echo -e "${GREEN}$((i+2)). ${commands[$i]}${NC}"
done

# Prompt the user to make a selection
echo -e "${BLUE}Enter the number for the command you want to run:${NC}"
read selection

# Check if the user wants to run all setup commands
if [[ $selection -eq 1 ]]; then
  for cmd in "${commands[@]}"; do
    echo -e " "
    echo -e "${BLUE}###${NC}"
    echo -e "${BLUE}Running '$cmd'...${NC}"
    make $cmd
  done
# Otherwise, validate the selection and if valid, execute the single Make command
elif [[ $selection -ge 2 && $selection -le $(( ${#commands[@]} + 1 )) ]]; then
  command=${commands[$((selection-2))]}
  make $command
else
  echo -e "${RED}Invalid selection${NC}"
fi