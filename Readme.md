# Envio

Dead simple environment parser for your app

```js
const Env = require('envio')
const assert = require('assert')

const env = Env({
  NODE_ENV: String, //
  PORT: 3000, // default 3000
})

assert.deepEqual(env, {
  NODE_ENV: 'development',
  PORT: 3000,
})
```

## Install

```sh
npm install envio
```

## License

MIT
