.PHONY: up down reload

up: install
	@echo "Starting the frontend..."
	docker-compose up -d

down:
	@echo "Stopping the frontend..."
	docker-compose down

reload: down up

install:
	@echo "Installing dependencies..."
	${MAKE} npm command=install

npm:
	@echo "Running npm command..."
	docker-compose run --rm --entrypoint npm server $(command)
