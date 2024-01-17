#!/bin/bash

function list_changed_files {
    # Get file with highest number of changes
    full_path=$(git diff --numstat | awk '{print $1+$2, $3}' | sort -nr | awk 'NR==1{print $2}')
    
    # Limit to two directories back
    first_file=$(echo $full_path | awk -F"/" '{OFS="/"; print $(NF-2),$(NF-1),$NF}')
    
    # Check the length of the file path, if it's too long (e.g., longer than 50 characters), limit to one directory back
    if (( ${#first_file} > 50 )); then
        first_file=$(echo $full_path | awk -F"/" '{OFS="/"; print $(NF-1),$NF}') 
    fi

    # Get array of changed files
    changed_files_arr=($(git diff --name-only))

    # Get length of array
    arr_length=${#changed_files_arr[@]}

    # Get total lines changed
    total_lines_changed=$(git diff --numstat | awk '{ total += $1 + $2 } END { print total }')
    
    # Check if multiple files have been changed
    if (( arr_length > 1 )); then
       other_files_count=$((arr_length-1))
       echo "save: ${first_file} and ${other_files_count} other files changed with a total of ${total_lines_changed} lines changed"
    else
       # Only one file has been changed
       echo "save: ${first_file} changed with ${total_lines_changed} lines changed"
    fi
}

list_changed_files