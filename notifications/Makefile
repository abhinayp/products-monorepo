.PHONY: up down migrate build reload restart install clean

up: install migrate
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
	rm -rf tmp/*
	rm -rf log/*
