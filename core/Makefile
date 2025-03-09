.PHONY: up down reload start-services stop-services reload-services

NETWORK_NAME=products

up:
	docker network create $(NETWORK_NAME) || true
	${MAKE} start-services

down:
	${MAKE} stop-services
	docker network rm $(NETWORK_NAME) || true

reload: down up

start-services:
	docker compose up -d

stop-services:
	docker compose down

reload-services: stop-services start-services
