.PHONY: setup setup-environment setup-hosts setup-ssl setup-packages dev

default: menu
menu:
	@bash devops/scripts/menu.sh
git:
	@bash devops/scripts/menu-git.sh
setup:
	@bash devops/scripts/menu-setup.sh

setup-environment:
	@bash devops/scripts/setup-environment.bash

setup-hosts:
	@echo "Setting up local development domains..."
	@echo "127.0.0.1 frontend.peacefulparenting.local" | sudo tee -a /etc/hosts
	@echo "127.0.0.1 admin.peacefulparenting.local" | sudo tee -a /etc/hosts
	@echo "127.0.0.1 backend.peacefulparenting.local" | sudo tee -a /etc/hosts

setup-ssl:
	@echo "Generating a self-signed SSL certificate..."
	@mkdir -p devops/cert
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout devops/cert/selfsigned.key -out devops/cert/selfsigned.crt -subj "/C=PL/ST=krakow/L=krakow/O=mattrybin/OU=peacefulparenting/CN=peacefulparenting/emailAddress=contact@mattrybin.com"

setup-packages:
	@echo "Setting up packages"
	@cd ./admin && pnpm install
	@cd ./backend && go get ./...
	@cd ./frontend && pnpm install

dev:
	@docker-compose --env-file development.database.env up --build


new-pr:
	@bash devops/scripts/git-new-feature.sh

git-checkout:
	@bash devops/scripts/git-checkout-pr.sh

git-checkout-development:
	@bash devops/scripts/git-checkout-development.sh

testing:
	@bash devops/scripts/git-checkout-pr.sh

commit-to-pr:
	@bash devops/scripts/git-commit.sh

merge-pr:
	@bash devops/scripts/git-merge-pr.sh

ask-for-help:
	@bash devops/scripts/ask-for-help.sh

ask-for-review:
	@bash devops/scripts/ask-for-review.sh

go-github-pr:
	@bash devops/scripts/go-github-pr.sh

go-notion-ticket:
	@bash devops/scripts/go-notion-ticket.sh