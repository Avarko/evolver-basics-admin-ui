# Evolver Basics Admin UI
Zero configuration admin UI for Spring Boot projects using [Evolver Basics Spring](https://github.com/Avarko/evolver-basics-spring).

Provides (eventually) self-hosted admin UIs for the following features: 
* Message log
* Triggerables
* Scheduled tasks
* Task statuses
* JWT tokens

## Links
* Maven Central: TODO
* GitHub: TODO


## Usage
* Add as project dependency
* Make sure that no class conflicts with `AdminUIWebConfig`
* Make sure that no other controller is mapped to `/admin-ui`

## Local package development
### Prerequisites
* Java 17
* Make

### Install
* Run `make install` to build and install the library to the local Maven cache

## Local frontend bundle development
### Prerequisites
* Node 20
* Npm 10
* Instance of a Spring Boot project using Evolver Basics Spring running locally
NOTE: the frontend assumes by default that the backend is running at `http://localhost:8080`

### Install
* Navigate to `src/main/javascript`
* Run `npm install` to install the dependencies
* Run `npm run dev` to start the development server


## Policies

### Branches
* `main`: Default branch into which all development branches are merged and where test/production versions are built from
* `<user>/<feature-name>`: Development branches for features / fixes, prefixed with developer's name/nick

### Version naming


### Pull requests


### Automated workflows


## Releasing and deploying version

### Preparations
