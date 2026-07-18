#!/usr/bin/env node

import { spawn } from 'node:child_process'
import net from 'node:net'
import readline from 'node:readline'

const PORT = 7610
const CYAN = '\u001b[36m'
const GREEN = '\u001b[92m'
const MAGENTA = '\u001b[35m'
const DIM = '\u001b[2m'
const RESET = '\u001b[0m'
const BANNER = `${MAGENTA}
╭────────────────────────────────────────────────────────────╮
│  ✦ BAZIL BACCHANALIA DAZIL // ARCANE OPERATIONS ✦          │
│    the little server familiar for the 7610th chamber      │
╰────────────────────────────────────────────────────────────╯${RESET}`

let server = null
let panelOpen = false
let panelReadline = null
let commandActive = false
let serverState = 'quiet'
let serverNote = 'no familiar'
let serverLogs = []
let serverReadyNotified = false

const write = (message = '') => process.stdout.write(`${message}\n`)

function promptText() {
  const colors = { live: GREEN, starting: CYAN, error: MAGENTA, quiet: DIM }
  const symbols = { live: '●', starting: '◌', error: '✕', quiet: '○' }
  const color = colors[serverState] ?? DIM
  const symbol = symbols[serverState] ?? '○'
  return `${GREEN}arcana${RESET} ${color}[${symbol} server: ${serverState} :${PORT}]${RESET} › `
}

function refreshPrompt() {
  if (panelReadline) {
    panelReadline.setPrompt(promptText())
    panelReadline.prompt(true)
  }
}

function setServerState(state, note) {
  const changed = serverState !== state || serverNote !== note
  serverState = state
  serverNote = note
  if (changed && !commandActive) refreshPrompt()
  if (changed && !panelOpen && state !== 'quiet') write(`${state === 'error' ? MAGENTA : GREEN}✦ ${note}${RESET}`)
}

function recordServerOutput(chunk) {
  const text = chunk.toString()
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  serverLogs = [...serverLogs, ...lines].slice(-4)

  if (/error when starting|EADDRINUSE|failed/i.test(text)) {
    setServerState('error', `The server familiar failed on port ${PORT}.`)
  } else if (/ready in|local:\s+http/i.test(text)) {
    setServerState('live', `The observatory is listening on port ${PORT}.`)
    announceServerLink()
  }
}

function copyToClipboard(value) {
  const clipboardCommands = process.platform === 'darwin'
    ? [['pbcopy', []]]
    : process.platform === 'win32'
      ? [['clip.exe', []]]
      : [['wl-copy', []], ['xclip', ['-selection', 'clipboard']], ['xsel', ['--clipboard', '--input']]]

  const tryCommand = (command, args) => new Promise((resolve) => {
    const child = spawn(command, args, { stdio: ['pipe', 'ignore', 'ignore'], shell: false })
    child.once('error', () => resolve(false))
    child.once('exit', (code) => resolve(code === 0))
    child.stdin.end(value)
  })

  return (async () => {
    for (const [command, args] of clipboardCommands) {
      if (await tryCommand(command, args)) return true
    }
    return false
  })()
}

async function announceServerLink() {
  if (serverReadyNotified) return
  serverReadyNotified = true
  const url = `http://localhost:${PORT}/`
  const copied = await copyToClipboard(url)
  write(`${GREEN}✦ HOME PAGE READY:${RESET} ${url}`)
  write(copied
    ? `${GREEN}✦ The link is copied to your clipboard.${RESET}`
    : `${DIM}The clipboard familiar was unavailable; copy the link above manually.${RESET}`)
}

function sayOmen() {
  const omens = [
    'The cards turn: ship the small change, then look at the console.',
    'A green flame rises over port 7610. The build is listening.',
    'The Moon says: your environment variable is public. Guard your secrets.',
    'The Tower has fallen. Good. Now run the lint spell before rebuilding.',
    'The Star offers a preview: static, luminous, and free of backend ghosts.',
  ]
  write(`${GREEN}✦ OMEN:${RESET} ${omens[Math.floor(Math.random() * omens.length)]}`)
}

function run(command, args = []) {
  return new Promise((resolve) => {
    // The TUI owns stdin. Child commands only need to write their output.
    const child = spawn(command, args, { stdio: ['ignore', 'inherit', 'inherit'], shell: false })
    child.on('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)))
    child.on('error', (error) => {
      write(`${MAGENTA}The spell guttered:${RESET} ${error.message}`)
      resolve(1)
    })
  })
}

function stopServer() {
  if (!server || server.exitCode !== null) {
    if (serverState === 'quiet') write(`${DIM}No familiar is currently bound to this terminal.${RESET}`)
    server = null
    setServerState('quiet', 'no familiar')
    return
  }

  const familiar = server
  server = null
  familiar.kill('SIGTERM')
  setServerState('quiet', 'no familiar')
  write(`${GREEN}✦ The observatory has been gently banished.${RESET}`)
}

function startServer(kind = 'dev') {
  if (server && server.exitCode === null) {
    write(`${DIM}The observatory is already awake on port ${PORT}.${RESET}`)
    return
  }

  const args = kind === 'preview'
    ? ['run', 'preview', '--', '--host', '0.0.0.0', '--port', String(PORT)]
    : ['run', 'dev', '--', '--host', '0.0.0.0']

  write(`${CYAN}✦ ${kind === 'preview' ? 'Scrying the built specimen' : 'Awakening the development observatory'} on port ${PORT}…${RESET}`)
  setServerState('starting', 'The observatory is waking up…')
  // Keep Vite's output inside the monitor. In particular, do not stream it
  // over the command prompt or let it inherit the TUI's stdin.
  server = spawn('npm', args, { stdio: ['ignore', 'pipe', 'pipe'], shell: false })
  serverLogs = []
  serverReadyNotified = false
  server.stdout.on('data', recordServerOutput)
  server.stderr.on('data', recordServerOutput)
  const familiar = server
  server.on('exit', (code, signal) => {
    if (server === familiar) {
      server = null
      if (code === 0 || signal === 'SIGTERM') setServerState('quiet', 'no familiar')
      else setServerState('error', `The server familiar departed (${code ?? signal ?? 'unknown'}).`)
    }
  })
  server.on('error', (error) => write(`${MAGENTA}The server spell failed:${RESET} ${error.message}`))
}

function checkPort() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port: PORT })
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('error', () => resolve(false))
  })
}

async function status() {
  const occupied = await checkPort()
  if (server && server.exitCode === null) {
    setServerState(occupied ? 'live' : 'starting', occupied ? `The observatory is listening on port ${PORT}.` : 'The observatory is waking up…')
  }
  if (!server && occupied) setServerState('error', `Port ${PORT} is occupied by another process.`)
  if (!occupied && !server) setServerState('quiet', 'no familiar')
  write(`${CYAN}╭─ server monitor ─────────────────────────────────────────╮${RESET}`)
  write(`${CYAN}│${RESET} state: ${serverState} · port: ${PORT}`)
  write(`${CYAN}│${RESET} note:  ${serverNote}`)
  if (serverLogs.length) write(`${CYAN}│${RESET} last:  ${serverLogs.at(-1)}`)
  write(`${CYAN}╰───────────────────────────────────────────────────────────╯${RESET}`)
}

async function command(spell) {
  const normalized = spell.trim().toLowerCase()
  if (!normalized) return
  if (normalized.includes('controlpanel') || normalized === 'invoke') {
    if (panelOpen) {
      write(`${DIM}The control panel is already open in this terminal.${RESET}`)
      return
    }
    return controlPanel()
  }
  if (normalized.includes('omen') || normalized.includes('fun') || normalized.includes('divine')) return sayOmen()
  if (normalized.includes('status') || normalized.includes('scry')) {
    if (normalized.includes('preview') || normalized.includes('production')) startServer('preview')
    else await status()
    return
  }
  if (normalized.includes('awaken') || normalized.includes('raise') || normalized.includes('start') || normalized === 'dev') {
    startServer('dev')
    return
  }
  if (normalized.includes('brew') || normalized.includes('build')) {
    await run('npm', ['run', 'build'])
    return
  }
  if (normalized.includes('deploy') || normalized.includes('publish') || normalized.includes('push')) {
    await run('npm', ['run', 'deploy'])
    return
  }
  if (normalized.includes('ward') || normalized.includes('lint')) {
    await run('npm', ['run', 'lint'])
    return
  }
  if (normalized.includes('banish') || normalized.includes('stop')) {
    stopServer()
    return
  }
  if (normalized === 'help' || normalized === '?') {
    printHelp()
    return
  }
  write(`${MAGENTA}The grimoire does not know “${spell}”. Try “help”, “awaken”, or “controlpanel”.${RESET}`)
}

function printHelp() {
  write(`${CYAN}Available incantations${RESET}`)
  write('  awaken / raise       start Vite dev server on port 7610')
  write('  scry / status        inspect the observatory and its port')
  write('  brew / build         create the production dist specimen')
  write('  ward / lint          run the protective lint ward')
  write('  deploy / publish     deploy production to Vercel')
  write('  omen / fun           receive a random operational omen')
  write('  banish / stop        stop the server started here')
  write('  controlpanel         open this interface again')
  write('  exit                 close the panel and stop its familiar')
}

async function controlPanel() {
  panelOpen = true
  process.stdout.write(BANNER)
  write(`${DIM}Type a spell, or “help” for the small grimoire. Ctrl-C exits.${RESET}`)
  printHelp()

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: promptText() })
  panelReadline = rl
  try {
    rl.prompt()
    for await (const line of rl) {
      if (line.trim().toLowerCase() === 'exit' || line.trim().toLowerCase() === 'quit') {
        rl.close()
        break
      }
      commandActive = true
      try {
        await command(line)
      } finally {
        commandActive = false
      }
      rl.setPrompt(promptText())
      rl.prompt()
    }
  } finally {
    panelOpen = false
    panelReadline = null
    rl.close()
  }
  stopServer()
}

process.on('SIGINT', () => {
  stopServer()
  process.exit(0)
})

const spell = process.argv.slice(2).join(' ')
if (spell) await command(spell)
else await controlPanel()
