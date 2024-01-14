#!/bin/bash

source utils/validate_current_branch_up_to_date.sh

validate_current_branch_up_to_date
# 
# function validate_current_branch_up_to_date {
#     # Update remote references
#     git remote update
    
#     # Configure upstream
#     current_branch=$(git branch --show-current)
#     UPSTREAM=${current_branch:-'@{u}'}
    
#     LOCAL=$(git rev-parse @)
#     REMOTE=$(git rev-parse "$UPSTREAM")
#     BASE=$(git merge-base @ "$UPSTREAM")

#     if [ $LOCAL != $REMOTE ]; then
#         echo "${BOLD}Your current branch '$current_branch' is not up-to-date with the remote branch.${NORMAL}"
        
#         while true; do
#             echo "Select an option:"
#             echo "1 - Quit / Do nothing."
#             echo "2 - Pull latest changes."
#             read -p "Your option: " option

#             case $option in
#                 1 )
#                     echo "Exiting without pulling changes..."
#                     exit 1;;
#                 2 )
#                     git pull --rebase
#                     if [ $? -ne 0 ]; then
#                         echo "Error pulling latest changes. Please ensure no merge conflicts or unstaged changes are present."
#                     else
#                         echo "Successfully pulled latest changes."
#                     fi
#                     break;;
#                 * )
#                     echo "Invalid option. Enter 1 or 2.";;
#             esac
#         done
#     fi
# }