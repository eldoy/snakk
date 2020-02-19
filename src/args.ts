const exec = process.env.SNAKK_EXEC || 'snakk'

function usage(err) {
  console.log(err)
  console.log(`\nUsage: ${exec} translate [input] [output] [from] [to]`)
  console.log(`\nExample: ${exec} translate en.yml no.yml en no`)
  process.exit(1)
}

export default {
  getCommand() {
    return process.argv[2] === 'translate' ? process.argv[2] : usage('\nCommand not specified.')
  },

  getInput() {
    return process.argv[3] && usage(`\nInput file name not specified.`)
  },

  getOutput() {
    return process.argv[4] && usage(`\nOutput file name not specified.`)
  },

  getFrom() {
    return process.argv[5] && usage(`\nFrom language not specified.`)
  },

  getTo() {
    return process.argv[6] && usage(`\nTo language not specified.`)
  }
}
