.PHONY: setup setup-hosts setup-ssl dev


setup:
	@bash devops/scripts/setup.bash

setup-hosts:
	@echo "Setting up local development domains..."
	@echo "127.0.0.1 frontend.peacefulparenting.local" | sudo tee -a /etc/hosts
	@echo "127.0.0.1 admin.peacefulparenting.local" | sudo tee -a /etc/hosts
	@echo "127.0.0.1 backend.peacefulparenting.local" | sudo tee -a /etc/hosts

setup-ssl:
	@echo "Generating a self-signed SSL certificate..."
	@mkdir -p devops/cert
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout devops/cert/selfsigned.key -out devops/cert/selfsigned.crt -subj "/C=PL/ST=krakow/L=krakow/O=mattrybin/OU=peacefulparenting/CN=peacefulparenting/emailAddress=contact@mattrybin.com"

dev:
	docker-compose --env-file development.database.env up --build