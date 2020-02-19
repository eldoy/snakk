const exec = process.env.SNAKK_EXEC || 'snakk'

function usage(err) {
  console.log(err)
  console.log(`\nUsage: ${exec} [input] [output] [from] [to]`)
  console.log(`\nExample: ${exec} en.yml no.yml en no`)
  process.exit(1)
}

function arg(n: number, msg: string): string {
  const a = process.argv[n]
  if (!a) usage(`\n${msg}`)
  console.log(a)
  return a
}

export default {
  getInput(): string {
    return arg(2, 'Input file name not specified.')
  },

  getOutput(): string {
    return arg(3, 'Output file name not specified.')
  },

  getFrom(): string {
    return arg(4, 'From language not specified.')
  },

  getTo(): string {
    return arg(5, 'To language not specified.')
  }
}
