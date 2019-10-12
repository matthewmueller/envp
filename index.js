/**
 * Export `Env`
 */

module.exports = Env

/**
 * `Env` function
 */

function Env(schema) {
  schema = schema || {}
  const out = {}
  for (let key in schema) {
    const value = process.env[key]
    // process.env[key] is undefined
    if (typeof value === 'undefined') {
      if (baseType(schema[key])) {
        throw new Error(`process.env.${key} is not defined`)
      }
      if (!defaultType(schema[key])) {
        throw new Error(`${key} must be either a string, number or boolean`)
      }
      out[key] = schema[key]
      continue
    }
    // we got something in process.env[key]
    switch (baseType(schema[key]) || defaultType(schema[key])) {
      case 'string':
        out[key] = value
        break
      case 'boolean':
        out[key] = value === 'false' ? false : Boolean(value)
        break
      case 'number':
        const n = parseInt(value, 10)
        if (isNaN(n)) {
          throw new Error(`process.env.${key} is not a number`)
        }
        out[key] = n
        break
      default:
        throw new Error(`process.env.${key} must be either a string, boolean or number`)
    }
  }
  return out
}

/**
 * Get the type
 */

function baseType(val) {
  switch (val) {
    case String:
      return 'string'
    case Boolean:
      return 'boolean'
    case Number:
      return 'number'
  }
}

/**
 * Check if it's a default value
 */

function defaultType(val) {
  switch (typeof val) {
    case 'string':
      return 'string'
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
  }
}
