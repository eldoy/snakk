const fs = require('fs')
const yaml = require('js-yaml')
const { Translate } = require('@google-cloud/translate').v2
const api = new Translate()

function usage(err) {
  console.log(err)
  console.log('\nUsage: translate file.yml [from] [to]')
  process.exit(1)
}

const name = process.argv[2]
if (!name) {
  usage('\nFile name not specified.')
}
console.log(name)

const from = process.argv[3]
if (!from) {
  usage('\nFrom language not specified.')
}
console.log(from)

const to = process.argv[4]
if (!to) {
  usage('\nFile name not specified.')
}
console.log(to)

let file
try {
  file = fs.readFileSync(name, 'utf-8')
} catch(e) {
  console.log('\nFile not found.')
  process.exit(1)
}

let data
try {
  data = yaml.load(file)
} catch(e) {
  console.log('\nCannot load YAML')
  process.exit(1)
}
console.log(data)

function write(obj) {
  let yml
  try {
    yml = yaml.dump(obj)
  } catch(e) {
    console.log('\nCannot dump YAML')
    process.exit(1)
  }

  console.log(yml)

  const [base, ext] = name.split('.')
  fs.writeFileSync(`${base}.${to}.${ext}`, yml)
}

async function run(obj) {
  async function traverse(obj) {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        await traverse(obj[key])
      } else {
        try {
          let [translations] = await api.translate(obj[key], { from, to })
          translations = Array.isArray(translations) ? translations : [translations]
          obj[key] = translations[0]
        } catch(e) {}
      }
    }
  }
  await traverse(obj)
  console.log('DONE')
  console.log(JSON.stringify(obj))
  write(obj)
}

run(data, from, to)
