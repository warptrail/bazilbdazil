#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const args = ['--yes', 'vercel', 'deploy', '--prod', '--yes']

process.stdout.write('✦ Sending the finished specimen to Vercel…\n')

const deployment = spawn(npx, args, {
  cwd: repositoryRoot,
  stdio: ['ignore', 'inherit', 'inherit'],
  shell: false,
})

deployment.on('error', (error) => {
  process.stderr.write(`Vercel deployment could not start: ${error.message}\n`)
  process.exitCode = 1
})

deployment.on('exit', (code, signal) => {
  if (signal) process.exitCode = 1
  else process.exitCode = code ?? 1
})
