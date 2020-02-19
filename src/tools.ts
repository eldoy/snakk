import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as _ from 'lodash'

import { v2 } from '@google-cloud/translate'
const { Translate } = v2
const api = new Translate()

const tools = {
  read(name: string): string {
    return fs.readFileSync(name, 'utf-8')
  },

  write(name: string, content: string): void {
    return fs.writeFileSync(name, content)
  },

  exists(name: string): boolean {
    return fs.existsSync(name)
  },

  dump(result: object): void {
    const yml: string = tools.getYAML(result)
    const [base, ext] = name.split('.')
    const out = `${to}.${ext}`
    console.log(`Writing file ${ out }`)
    tools.write(out, yml)
  },

  async translate(value: any, from: string, to: string): Promise<string> {
    if (typeof value !== 'string') return value
    try {
      const [result] = await api.translate(value, { from, to })
      return (Array.isArray(result) ? result : [result])[0]
    } catch (e) {
      return value
    }
  },

  getFile(name: string): string {
    try {
      return tools.read(name)
    } catch (e) {
      console.log('\nFile not found.')
      process.exit(1)
    }
  },

  getData(file: string): object {
    try {
      return yaml.load(file)
    } catch (e) {
      console.log('\nCannot load YAML')
      process.exit(1)
    }
  },

  getYAML(obj: object): string {
    try {
      return yaml.dump(obj)
    } catch (e) {
      console.log('\nCannot dump YAML')
      process.exit(1)
    }
  }
}

export default tools