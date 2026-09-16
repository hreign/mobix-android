import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, cpSync, rmSync, writeFileSync, chmodSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

function run(cmd) {
  console.log(`执行：${cmd}`)
  execSync(cmd, { cwd: root, stdio: 'inherit' })
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true })
}

console.log('=== Mobix 发布构建开始 ===')

run('pnpm -C ui build')
run('pnpm -C app build')
run('pnpm -C cli build')

const publicDir = resolve(root, 'public')
const distDir = resolve(root, 'dist')
const binDir = resolve(root, 'bin')
const cliDistDir = resolve(root, 'dist', 'cli')

rmSync(publicDir, { recursive: true, force: true })
rmSync(distDir, { recursive: true, force: true })
rmSync(binDir, { recursive: true, force: true })

ensureDir(publicDir)
ensureDir(distDir)
ensureDir(binDir)
ensureDir(cliDistDir)

console.log('复制前端产物到 public/')
cpSync(resolve(root, 'app', 'public'), publicDir, { recursive: true })

console.log('复制后端产物到 dist/')
cpSync(resolve(root, 'app', 'dist'), distDir, { recursive: true })

console.log('复制 CLI 产物到 dist/cli/')
cpSync(resolve(root, 'cli', 'dist'), cliDistDir, { recursive: true })

console.log('生成 bin/mobix.js 入口')
const mobixJs = `#!/usr/bin/env node
require('../dist/cli/index.js')
`
const mobixPath = resolve(binDir, 'mobix.js')
writeFileSync(mobixPath, mobixJs)
chmodSync(mobixPath, 0o755)

console.log('\n=== 发布构建完成 ===')
console.log('产物结构：')
console.log('  bin/mobix.js        CLI 入口')
console.log('  dist/               后端编译产物')
console.log('  dist/cli/           CLI 编译产物')
console.log('  public/             前端构建产物')

console.log('\n验证 tarball 内容：')
try {
  execSync('npm pack --dry-run', { cwd: root, stdio: 'inherit' })
} catch {
  console.warn('npm pack --dry-run 失败，请手动验证')
}
