# Darkwire Client

This is the client for [Darkwire](https://github.com/seripap/darkwire.io). It requires [darkwire-server](https://github.com/seripap/darkwire-server) in order to run.

Go the [main repo](https://github.com/seripap/darkwire.io) for instructions on using `docker` to run the whole app (client and server).

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
