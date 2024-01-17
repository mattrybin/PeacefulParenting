.PHONY: setup setup-environment setup-hosts setup-ssl setup-packages dev

MENU_SETUP_SCRIPT = devops/scripts/menu-setup.sh
MENU_GIT_SCRIPT = devops/scripts/menu-git.sh
MENU_SCRIPT = devops/scripts/menu.sh

default: menu
menu:
	@bash $(MENU_SCRIPT)
git:
	@bash $(MENU_GIT_SCRIPT)
setup:
	@bash $(MENU_SETUP_SCRIPT)



SETUP_ENVIRONMENT_SCRIPT = devops/scripts/setup-environment.bash
setup-environment:
	@bash $(SETUP_ENVIRONMENT_SCRIPT)

setup-hosts:
	@echo "Setting up local development domains..."
	@echo "127.0.0.1 frontend.peacefulparenting.local" | sudo tee -a /etc/hosts
	@echo "127.0.0.1 admin.peacefulparenting.local" | sudo tee -a /etc/hosts
	@echo "127.0.0.1 backend.peacefulparenting.local" | sudo tee -a /etc/hosts

setup-ssl:
	@echo "Generating a self-signed SSL certificate using mkcert..."
	@mkdir -p devops/cert
	@mkcert -install
	@mkcert -key-file devops/cert/selfsigned.key -cert-file devops/cert/selfsigned.crt peacefulparenting.local "*.peacefulparenting.local"

setup-packages:
	@echo "Setting up packages"
	@cd ./admin && pnpm install
	@cd ./backend && go get ./...
	@cd ./frontend && pnpm install

dev:
	@docker info >/dev/null 2>&1 || (echo "Docker is not running" ; exit 1)
	@docker-compose --env-file development.database.env up --build

GIT_NEW_FEATURE_SCRIPT = devops/scripts/git-new-feature.sh
GIT_CHECKOUT_PR_SCRIPT = devops/scripts/git-checkout-pr.sh
GIT_MERGE_PR_SCRIPT = devops/scripts/git-merge-pr.sh
GIT_COMMIT_SCRIPT = devops/scripts/git-commit.sh
ASK_FOR_HELP = devops/scripts/ask-for-help.sh
ASK_FOR_REVIEW = devops/scripts/ask-for-review.sh
GO_NOTION_TICKET = devops/scripts/go-notion-ticket.sh

new-pr:
	@bash $(GIT_NEW_FEATURE_SCRIPT)

git-checkout:
	@bash $(GIT_CHECKOUT_PR_SCRIPT)


TESTING = devops/scripts/notion-check.sh
testing:
	@bash $(TESTING)

commit-to-pr:
	@bash $(GIT_COMMIT_SCRIPT)

merge-pr:
	@bash $(GIT_MERGE_PR_SCRIPT)

ask-for-help:
	@bash $(ASK_FOR_HELP)

ask-for-review:
	@bash $(ASK_FOR_REVIEW)

go-github-pr:
	@bash $(GO_GITHUB_PR)

go-notion-ticket:
	@bash $(GO_NOTION_TICKET)