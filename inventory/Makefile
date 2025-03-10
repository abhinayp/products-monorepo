.PHONY: up down migrate build reload restart install clean logs shell clear-cache seed

up: build install migrate
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

migrate:
	docker compose run --rm server db:migrate

seed:
	docker compose run --rm server db:seed

reload: down up

restart:
	docker compose restart

install:
	docker compose run --rm --entrypoint ./bin/bundle server install

clear-cache:
	rm -rf vendor/bundle

logs:
	docker compose logs -f

shell:
	docker compose exec server bash
