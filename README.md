# Darkwire Client

This is the client for Darkwire. It requires [darkwire-server](https://github.com/seripap/darkwire-server) in order to run.

## Dev

```
$ yarn
$ yarn dev
```

A dev server is now running on port 8080.

## Docker

Building locally:

```
$ docker build -t darkwire-client .
```

Run from official repository:
```
$ docker run -p 80:80 darkwire/darkwire-client
```
