# Set JAVA_17_HOME in e.g. ~/.profile
# Example: EXPORT JAVA_17_HOME=/usr/lib/jvm/java-17-openjdk-amd64
JAVA_HOME=$(JAVA_17_HOME)

.EXPORT_ALL_VARIABLES:

.DEFAULT_GOAL := help
.PHONY: help
help: ## Print help
	@grep ':.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m%s\n", $$1, $$2}' | grep -v 'ignore' | sort

install: ## Build and install to the local Maven repository
	mvn clean install -Dgpg.skip

release: ## Prepare a release version
	mvn release:prepare -Darguments=-Dgpg.skip && git clean -f && git reset --hard && git fetch