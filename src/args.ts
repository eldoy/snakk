function usage(err) {
  console.log(err)
  console.log('\nUsage: snakk [filename] [from] [to]')
  console.log('\nExample: snakk file.yml en no')
  process.exit(1)
}

export default {
  getName: function(): string {
    const name = process.argv[2]
    if (!name) {
      usage('\nFile name not specified.')
    }
    console.log(name)
    return name
  },

  getFrom: function(): string {
    const from = process.argv[3]
    if (!from) {
      usage('\nFrom language not specified.')
    }
    console.log(from)
    return from
  },

  getTo: function(): string {
    const to = process.argv[4]
    if (!to) {
      usage('\nFile name not specified.')
    }
    console.log(to)
    return to
  }
}
