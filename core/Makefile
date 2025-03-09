.PHONY: up down reload start-services stop-services reload-services

NETWORK_NAME=products

up:
	docker network create $(NETWORK_NAME)
	${MAKE} start-services

down:
	docker network rm $(NETWORK_NAME)
	${MAKE} stop-services

reload: down up

start-services:
	docker compose up -d

stop-services:
	docker compose down

reload-services: stop-services start-services
