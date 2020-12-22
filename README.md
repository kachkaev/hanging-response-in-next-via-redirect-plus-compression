This repo was created using:

```sh
DIR_NAME=hanging-http-response-in-nextjs-with-compress
npx create-next-app $DIR_NAME
cd $DIR_NAME

```

Local reproduction via [nvm](https://github.com/nvm-sh/nvm)

```sh
## OK
NODE_VERSION=v12.20.0
NODE_VERSION=v13.14.0

## BROKEN
NODE_VERSION=v14.0.0
NODE_VERSION=v14.15.3
NODE_VERSION=v15.5.0
```

```sh
nvm install $NODE_VERSION && nvm use $NODE_VERSION && npm i -g yarn && yarn --ignore-engines && yarn --ignore-engines dev
```
