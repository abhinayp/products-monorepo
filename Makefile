SETUP_DIR := core
MICROSERVICES := inventory orders cart notifications payments accounts api-gateway websockets frontend

.PHONY: up down reload setup clean clear-cache system-prune logs shell

ifneq ($(service),)
MICROSERVICES := $(service)
SETUP_DIR :=
endif
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
	@if [ -d "$(SETUP_DIR)" ]; then \
		$(MAKE) -C $(SETUP_DIR) up; \
	fi

clean:
	@if [ -d "$(SETUP_DIR)" ]; then \
		$(MAKE) -C $(SETUP_DIR) clean; \
	fi

clear-cache:
	@for dir in $(MICROSERVICES); do \
		$(MAKE) -C $$dir clear-cache || true; \
	done

system-prune:
	docker system prune --all

logs:
	@if [ -z "$(service)" ]; then \
		echo "Please provide a service name, e.g., 'make logs service=inventory'"; \
		exit 1; \
	fi
	$(MAKE) -C $(service) logs;

shell:
	@if [ -z "$(service)" ]; then \
		echo "Please provide a service name, e.g., 'make shell service=inventory'"; \
		exit 1; \
	fi
	$(MAKE) -C $(service) shell;

install:
	@for dir in $(MICROSERVICES); do \
		$(MAKE) -C $$dir install; \
	done
