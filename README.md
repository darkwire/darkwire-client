# Darkwire Client

This is the client for [Darkwire](https://github.com/seripap/darkwire.io). It requires [darkwire-server](https://github.com/seripap/darkwire-server) in order to run.

For more information about how Darkwire works, visit the [main repoistory](https://github.com/seripap/darkwire.io).

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
