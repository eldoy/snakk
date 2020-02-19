import * as _ from 'lodash'
import * as flat from 'flat'
import args from './args'
import tools from './tools'

const input: string = args.getInput()
const output: string = args.getOutput()
const from: string = args.getFrom()
const to: string = args.getTo()

const source: string = tools.getFile(input)
const data: object = tools.getData(source)

let exst: object
if (tools.exists(output)) {
  exst = tools.getData(tools.read(output))
}

const tree: object = flat.flatten(data)

;(async function() {
  const result = {}
  for (const key in tree) {
    let value = tree[key]
    let has = _.get(exst, key)
    if (typeof has !== 'string') {
      value = await tools.translate(value, from, to)
    }
    _.set(result, key, has || value)
  }
  tools.dump(result, output)
}())
