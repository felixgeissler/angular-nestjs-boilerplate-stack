<div align="center">
  <a href="https://angular.io/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="120" alt="Angular Logo"/></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo"/></a>
  <a href="https://docker.com/" target="blank"><img src="https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png" width="120" alt="Docker Logo"/></a>
  <br>
  <h1>Angular & NestJS API Boilerplate</h1>
  <h3>A dockerized stack, ready for development / deployment</h3>
  <img alt="GitHub License" src="https://img.shields.io/github/license/felixgeissler/angular-nestjs-boilerplate-stack?style=flat&color=%233fa1f0">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/felixgeissler/angular-nestjs-boilerplate-stack?style=flat&color=%233fa1f0">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/felixgeissler/angular-nestjs-boilerplate-stack?style=flat&color=%233fa1f0">
  <a href="https://discordapp.com/users/340814169194364928" target="blank">
    <img alt="Discord" src="https://img.shields.io/badge/contact-flx.gsslr-%237289DA?style=flat&logo=discord&logoColor=white">
  </a>
</div>

## Setup for Development

1. Create a **.env** copy from **.env.example** (adjust e.g. ports)
```
cp .env.dev.example .env
```
2. Startup containers via docker-compose:
```
docker-compose up -d
```


## Deployment
This docker setup is configured to use with an [reverse proxy server](https://hub.docker.com/r/jwilder/nginx-proxy) in order to
deploy & expose multiple docker setups from a single machine.

1. Checkout/pull latest version of the project
2. Create a **.env** copy from **.env.example**
```bash
cp .env.prod.example .env
```
3. Edit variables in **.env** file (e.g. ports / secrets)
```bash
vi .env
```
4. Startup containers via docker-compose:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```


## Development notes

## Tooling

Tunnel to docker service shell:
```bash
docker-compose exec SERVICE_NAME_HERE /bin/sh
```

Additional CLI shortcuts a listed in the **maidfile.md** or via ([Maid](https://github.com/egoist/maid) required):
```bash
maid help
```

Execute [Maid](https://github.com/egoist/maid) tasks like:
```bash
maid TASKNAME
```

### NPM Dependencies
Installing npm dependencies via ```npm install``` won't mount the localy installed modules into the docker context, since the
anonymous volumes aren’t removed until their parent container is removed.

To overcome this issue simply run:
```bash
docker-compose up --build -V
```
The ```--build``` parameter will make sure the npm install is run (during the build process), and the ```-V``` argument will remove any anonymous volumes and create them again.

### Debugging with VS Code
On the left-hand side of VS Code, open the **Debug & Run Panel** and **create a launch.json file**. For proper NestJS backend debugging, replace the content of the config with the following:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug: app-name",
      "remoteRoot": "/usr/src/app",
      "localRoot": "${workspaceFolder}/backend",
      "protocol": "inspector",
      "port": 9229,
      "restart": true,
      "address": "0.0.0.0",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
 }
```