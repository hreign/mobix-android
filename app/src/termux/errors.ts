export class TermuxError extends Error {
  constructor(
    public code: number,
    public errorType: string,
    message: string,
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class CommandNotInstalledError extends TermuxError {
  constructor(public commandName: string) {
    super(1001, 'COMMAND_NOT_INSTALLED', `命令未安装: ${commandName}`)
  }
}

export class CommandTimeoutError extends TermuxError {
  constructor(public commandName: string, public timeoutMs: number) {
    super(1002, 'COMMAND_TIMEOUT', `命令执行超时: ${commandName}（${timeoutMs}ms）`)
  }
}

export class OutputParseError extends TermuxError {
  constructor(public rawSnippet: string) {
    super(1003, 'OUTPUT_PARSE_ERROR', '命令输出解析失败')
  }
}

export class CommandExecutionError extends TermuxError {
  constructor(public exitCode: number, public stderr: string) {
    super(1004, 'COMMAND_EXECUTION_ERROR', `命令执行失败，退出码 ${exitCode}`)
  }
}

export class ValidationError extends TermuxError {
  constructor(public field: string, message: string) {
    super(2001, 'VALIDATION_ERROR', message)
  }
}

export class InternalError extends TermuxError {
  constructor(message = '内部错误') {
    super(5000, 'INTERNAL_ERROR', message)
  }
}

export class UnauthorizedError extends TermuxError {
  constructor(message = '未授权') {
    super(4011, 'UNAUTHORIZED', message)
  }
}
