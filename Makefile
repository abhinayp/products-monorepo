SETUP_DIR := core
MICROSERVICES := inventory orders cart notifications

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
