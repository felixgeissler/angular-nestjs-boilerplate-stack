# Angular & NestJS API Boilerplate Stack

## Setup for Development

To setup & run the application, simply execute:
```
cp .env.example .env
docker-compose up
```

## Development notes

### NPM Dependencies
Installing npm dependencies via ```npm install``` won't mount the localy installed modules into the docker context, since the
aanonymous volumes aren’t removed until their parent container is removed.

To overcome this issue simply run:
```
docker-compose up --build -V
```
The ```--build``` parameter will make sure the npm install is run (during the build process), and the ```-V``` argument will remove any anonymous volumes and create them again.

### Debugging with VS Code
On the left-hand side of VS Code, open the **Debug & Run Panel** and **create a launch.json file**. For proper NestJS backend debugging, replace the content of the config with the following:
```
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