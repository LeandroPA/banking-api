BANKING_API_GATEWAY := banking-api-gateway
ACCOUNT_API = account-api
CLIENT_API = client-api
TRANSACTION_API = transaction-api
BANKING_API_GATEWAY_PATH = $(BANKING_API_GATEWAY)
SWAGGER_OUTPUT_FAT = $(BANKING_API_GATEWAY_PATH)/swagger-output.json
SWAGGER_OUTPUT_FOLDER = $(BANKING_API_GATEWAY_PATH)/swagger-outputs
export SWAGGER_OUTPUT_FOLDER_APP = ../$(SWAGGER_OUTPUT_FOLDER)


define npmRun
	npm run $(2) --prefix $(1)
endef

.PHONY:%-build
%-build:
	$(call npmRun,$*,build)

.PHONY:build
build: $(ACCOUNT_API)-build $(CLIENT_API)-build $(TRANSACTION_API)-build	
	@docker-compose build
	@echo "Build completed!"

.PHONY:docs-output
docs-output:
	@mkdir -p $(SWAGGER_OUTPUT_FOLDER)
	@echo "$(SWAGGER_OUTPUT_FOLDER) output folder created!"	

.PHONY:%-docs
%-docs: docs-output
	$(call npmRun,$*,swagger-autogen)

.PHONY:$(BANKING_API_GATEWAY)-docs-fetch
$(BANKING_API_GATEWAY)-docs-fetch:
	@jq -s 'reduce .[] as $$item ({}; . * $$item)' $(SWAGGER_OUTPUT_FOLDER)/*.json > $(SWAGGER_OUTPUT_FAT)
	@rm -r $(SWAGGER_OUTPUT_FOLDER)
	@echo "$(SWAGGER_OUTPUT_FAT) created with success!"	

.PHONY:docs
docs: $(ACCOUNT_API)-docs $(CLIENT_API)-docs $(TRANSACTION_API)-docs
	make $(BANKING_API_GATEWAY)-docs-fetch
	@echo "Docs completed!"

.PHONY:docker
docker:
	@echo "Composing Docker"
	@docker-compose up
