var { read, write, exist, lodash, dot } = require('extras')

// https://www.npmjs.com/package/@google-cloud/translate
var { Translate } = require('@google-cloud/translate').v2
var projectId = 'api-project-357324255329'
var api = new Translate({ projectId })

var exec = process.env.SNAKK_EXEC || 'snakk'

function usage(err) {
  console.log(err)
  console.log(`\nUsage: ${exec} translate [input] [output] [from] [to]`)
  console.log(`\nExample: ${exec} translate en.yml no.yml en no`)
  process.exit()
}

var [command, input, output, from, to] = process.argv.slice(2)

if (!command) usage('\nCommand not specified.')
if (!input) usage(`\nInput file name not specified.`)
if (!exist(input)) usage(`\nInput file does not exist.`)
if (!output) usage(`\nOutput file name not specified.`)
if (!from) usage(`\nFrom language not specified.`)
if (!to) usage(`\nTo language not specified.`)

// Uncomment for testing:
// console.log({ command, input, output, from, to })

async function translate(value) {
  if (typeof value !== 'string') return value
  try {
    var [result] = await api.translate(value, { from, to })
    return (Array.isArray(result) ? result : [result])[0]
  } catch (e) {
    console.log(e)
    console.log('Skipping value:', value)
    return value
  }
}

async function main() {
  var source = dot(read(input))
  var result = {}

  for (var key in source) {
    var value = source[key]
    var translation = await translate(value)
    lodash.set(result, key, translation)
  }

  write(output, result)

  console.log(`Result written to ${output}`)

  process.exit()
}

main()
