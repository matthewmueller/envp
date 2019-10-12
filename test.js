const assert = require('assert')
const execa = require('execa')
const Env = require('./')

const tests = [
  {
    title: 'string ok',
    schema: {
      VALUE: String,
    },
    env: {
      VALUE: 'A',
    },
    expected: {
      VALUE: 'A',
    },
  },
  {
    title: 'number ok',
    schema: {
      VALUE: Number,
    },
    env: {
      VALUE: '3000',
    },
    expected: {
      VALUE: 3000,
    },
  },
  {
    title: 'number nan not ok',
    schema: {
      VALUE: Number,
    },
    env: {
      VALUE: 'ZARGLE',
    },
    error: 'process.env.VALUE is not a number',
  },
  {
    title: 'boolean true ok',
    schema: {
      VALUE: Boolean,
    },
    env: {
      VALUE: 'true',
    },
    expected: {
      VALUE: true,
    },
  },
  {
    title: 'boolean false ok',
    schema: {
      VALUE: Boolean,
    },
    env: {
      VALUE: 'false',
    },
    expected: {
      VALUE: false,
    },
  },
  {
    title: 'string default',
    schema: {
      VALUE: 'A',
    },
    expected: {
      VALUE: 'A',
    },
  },
  {
    title: 'number default',
    schema: {
      VALUE: 0,
    },
    expected: {
      VALUE: 0,
    },
  },
  {
    title: 'boolean true default',
    schema: {
      VALUE: true,
    },
    expected: {
      VALUE: true,
    },
  },
  {
    title: 'boolean false default',
    schema: {
      VALUE: false,
    },
    expected: {
      VALUE: false,
    },
  },
  {
    title: 'string override',
    schema: {
      VALUE: 'A',
    },
    env: {
      VALUE: 'B',
    },
    expected: {
      VALUE: 'B',
    },
  },
  {
    title: 'number override',
    schema: {
      VALUE: 0,
    },
    env: {
      VALUE: '10',
    },
    expected: {
      VALUE: 10,
    },
  },
  {
    title: 'number nan override',
    schema: {
      VALUE: 0,
    },
    env: {
      VALUE: 'ZARGLE',
    },
    error: 'process.env.VALUE is not a number',
  },
  {
    title: 'boolean true override',
    schema: {
      VALUE: true,
    },
    env: {
      VALUE: 'false',
    },
    expected: {
      VALUE: false,
    },
  },
  {
    title: 'boolean false override',
    schema: {
      VALUE: false,
    },
    env: {
      VALUE: 'true',
    },
    expected: {
      VALUE: true,
    },
  },
  {
    title: 'string error',
    schema: {
      VALUE: String,
    },
    error: 'process.env.VALUE is not defined',
  },
  {
    title: 'number error',
    schema: {
      VALUE: Number,
    },
    error: 'process.env.VALUE is not defined',
  },
  {
    title: 'boolean true error',
    schema: {
      VALUE: Boolean,
    },
    error: 'process.env.VALUE is not defined',
  },
]

describe('Env', function() {
  tests.forEach(test => {
    it(test.title, function() {
      if (!process.env.TESTING) {
        try {
          exec(test.title, test.env)
        } catch (err) {
          console.error(err.stdout)
          throw err
        }
        return
      }

      let out, err
      try {
        out = Env(test.schema)
      } catch (error) {
        err = error
      }
      if (err) {
        assert.strictEqual(err.message, test.error, `"${err.message}" != "${test.error}"`)
        return
      }
      assert.deepStrictEqual(out, test.expected, `output doesn't match the expected`)
    })
  })
})

function exec(title, env) {
  // console.log(`${process.argv[0]} ${[process.argv[1]].concat('--grep', JSON.stringify(title), __filename).join(' ')}`)
  // console.log('processsssssss', process.argv[0].concat([process.argv[1]].concat('--grep', JSON.stringify(title)), __filename).join(' '))
  const node = process.argv[0]
  const args = [process.argv[1]].concat('--grep', JSON.stringify(title), __filename)
  return execa.sync(node, args, {
    // stdout: process.stdout,
    // stderr: process.stderr,
    env: { ...env, TESTING: 1 },
    cwd: process.cwd(),
  })
}
