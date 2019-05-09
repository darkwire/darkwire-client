# Darkwire Client [![CircleCI](https://circleci.com/gh/darkwire/darkwire-client.svg?style=svg)](https://circleci.com/gh/darkwire/darkwire-client)

This is the client for [Darkwire](https://github.com/darkwire/darkwire.io). It requires [darkwire-server](https://github.com/darkwire/darkwire-server) in order to run.

For more information about how Darkwire works, visit the [main repository](https://github.com/darkwire/darkwire.io).

## Dev

```
$ yarn
$ yarn start
```

## Docker

Building locally:

```
$ docker build -t darkwire-client .
```

Run from official repository:
```
$ docker run -p 80:80 darkwire/darkwire-client
```
