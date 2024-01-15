source ./.env.local

github_assign_state() {
    PR_NUMBER=$(gh pr view --json number --jq .number)
    PR_LINK="https://github.com/mattrybin/peacefulparenting/pull/$PR_NUMBER/files"
    PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq .title)

    # Get PR current labels
    PR_LABELS=$(gh pr view $PR_NUMBER --json labels --jq '.labels[]?.name' | tr -d '"')

    # Check if "DRAFT" label exists
    if [[ $PR_LABELS =~ "DRAFT" ]]; then
        # Removes the "DRAFT" label from this PR
        gh pr edit "$PR_NUMBER" --remove-label "DRAFT"
    fi

    # Check if "REVIEW" label does not exist
    if [[ ! $PR_LABELS =~ "REVIEW" ]]; then
        # Adding "REVIEW" label to this PR
        gh pr edit "$PR_NUMBER" --add-label "REVIEW"
    fi
}