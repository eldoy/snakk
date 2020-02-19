import * as _ from 'lodash'
import * as flat from 'flat'
import args from './args'
import tools from './tools'

const name: string = args.getName()
const from: string = args.getFrom()
const to: string = args.getTo()
const file: string = tools.getFile(name)
const data: object = tools.getData(file)

let exst: object
if (tools.exists(to)) {
  exst = tools.getData(tools.read(to))
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
  console.log(JSON.stringify(result, null, 2))
  tools.dump(result, name, to)
}())
