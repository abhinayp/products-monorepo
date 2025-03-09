.PHONY: up down migrate

up: migrate
	docker-compose up -d

down:
	docker-compose down

migrate:
	docker-compose run --rm server db:migrate

reload: down up

restart:
	docker-compose restart
