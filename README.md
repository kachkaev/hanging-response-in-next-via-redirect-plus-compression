# MWE for hanging http responses in Next.js when using res.redirect and compression

**TL;DR**;

Using

```ts
res.redirect("/pathname");
res.end();
```

instead of

```ts
res.redirect();
```

Causes issues with subsequent page / api requests when:

- node version is >= 14.0.0
- `next.config.js` → `compress` is enabled (default)
- compressed body size of a follow-up response is greater than `zlib.Z_DEFAULT_CHUNK` (=16384 bytes)

## Remedy

Option 1: remove `res.end()`

Option 2: Instead of Next.js `res.redirect()` use:

```ts
res.writeHead(302, { Location: "/pathname" });
res.end();
```

## Local reproduction

Needs [nvm](https://github.com/nvm-sh/nvm)

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
