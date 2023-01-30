ACCOUNT_API = account-api
CLIENT_API = client-api
TRANSACTION_API = transaction-api

define npmRun
	@echo Running $(2) in $(1)
	npm run $(2) --prefix $(1)
endef

.PHONY:build
build:
	@echo "Building..."
	$(call npmRun,$(ACCOUNT_API),build)
	$(call npmRun,$(CLIENT_API),build)
	$(call npmRun,$(TRANSACTION_API),build)

.PHONY:docs
docs:
	@echo "Generating docs..."
	$(call npmRun,$(ACCOUNT_API),swagger-autogen)
	$(call npmRun,$(CLIENT_API),swagger-autogen)
	$(call npmRun,$(TRANSACTION_API),swagger-autogen)

.PHONY:docker
docker:
	@echo "Composing Docker"
	@docker-compose up --build
