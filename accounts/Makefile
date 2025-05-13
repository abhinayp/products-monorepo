.PHONY: up down migrate build reload restart install clean logs shell

up: build install migrate clear-server-pid
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

migrate:
	docker compose run --rm server db:migrate

reload: down up

restart:
	docker compose restart

install:
	docker compose run --rm --entrypoint ./bin/bundle server install

clear-cache:
	rm -rf vendor/bundle

clear-server-pid:
	rm -f tmp/pids/server.pid

logs:
	docker compose logs -f

shell:
	docker compose exec server bash
