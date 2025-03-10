SETUP_DIR := core
MICROSERVICES := inventory orders cart notifications payments accounts api-gateway websockets frontend

.PHONY: up down

up: setup
	@for dir in $(MICROSERVICES); do \
		$(MAKE) -C $$dir up; \
	done

down:
	@for dir in $(MICROSERVICES); do \
		$(MAKE) -C $$dir down; \
	done
	$(MAKE) clean

reload: down up

# setup and cleanup
setup:
	$(MAKE) -C $(SETUP_DIR) up

clean:
	$(MAKE) -C $(SETUP_DIR) down

clear-cache:
	@for dir in $(MICROSERVICES); do \
		$(MAKE) -C $$dir clear-cache || true; \
	done

system-prune:
	docker system prune --all
