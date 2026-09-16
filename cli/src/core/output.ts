export function ok(msg: string): void {
  console.log(msg)
}

export function info(msg: string): void {
  console.log(msg)
}

export function fail(msg: string, code = 1): void {
  console.error(msg)
  process.exit(code)
}

export function exit(code = 0): void {
  process.exit(code)
}
