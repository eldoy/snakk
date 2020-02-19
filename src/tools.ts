import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as _ from 'lodash'

import { v2 } from '@google-cloud/translate'
const { Translate } = v2
const api = new Translate()

const tools = {
  read(name) {
    return fs.readFileSync(name, 'utf-8')
  },

  write(name, content) {
    return fs.writeFileSync(name, content)
  },

  exists(name) {
    return fs.existsSync(name)
  },

  async translate(value, from, to) {
    if (typeof value !== 'string') return value
    try {
      const [result] = await api.translate(value, { from, to })
      return (Array.isArray(result) ? result : [result])[0]
    } catch (e) {
      console.log('Skipping value:', value)
      return value
    }
  },

  getFile(name) {
    try {
      return tools.read(name)
    } catch (e) {
      console.log('\nFile not found:', name)
      process.exit(1)
    }
  },

  getData(file) {
    try {
      return yaml.load(file)
    } catch (e) {
      console.log('\nCannot load YAML')
      process.exit(1)
    }
  },

  getYAML(obj) {
    try {
      return yaml.dump(obj)
    } catch (e) {
      console.log('\nCannot dump YAML')
      process.exit(1)
    }
  },

  dump(result, output) {
    const yml = tools.getYAML(result)
    console.log(`Writing file ${output}`)
    tools.write(output, yml)
  }
}

export default tools
