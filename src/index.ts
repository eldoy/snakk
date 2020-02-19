import * as _ from 'lodash'
import * as flat from 'flat'
import args from './args'
import tools from './tools'

const command = args.getCommand()
const input = args.getInput()
const output = args.getOutput()
const from = args.getFrom()
const to = args.getTo()

const source = tools.getFile(input)
const data = tools.getData(source)

const result = tools.exists(output) ? tools.getData(tools.read(output)) : {}

const tree = flat.flatten(data)
;(async function() {
  for (const key in tree) {
    let value = tree[key]
    let has = _.get(result, key)
    if (typeof has !== 'string') {
      value = await tools.translate(value, from, to)
    }
    _.set(result, key, has || value)
  }
  tools.dump(result, output)
})()
