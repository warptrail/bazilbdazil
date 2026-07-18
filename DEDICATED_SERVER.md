# Dedicated server setup — the 7610th chamber

This app uses port **7610**. It is intentionally reserved for the tarot site; do not reuse ports 7607–7609 or 7623–7624, which belong to other projects.

The project includes a dependency-free terminal grimoire for local development. From the repository root, the shortest ritual is:

```bash
cd frontend
npm ci
npm run controlpanel
```

Inside the control panel, type `awaken` to start the development server. Once Vite is ready, the TUI prints the home-page link (`http://localhost:7610/`) and copies it to the clipboard automatically. Vite’s remaining output is contained in a compact server monitor badge beside the prompt, so the terminal remains available for more spells. Use `status` for the detailed monitor, `omen` for a small operational prophecy, and `help` to see the full spellbook. Type `exit` or press `Ctrl-C` to close the panel and stop the server it started.

## Install and build

On the server, install Node.js 20 LTS (or newer), then run:

```bash
git clone <repository-url> tarot_webpage
cd tarot_webpage/frontend
npm ci
npm run build
```

If booking is enabled, create `frontend/.env.local` before building and add the Cal.com value:

```dotenv
VITE_CAL_LINK=your-cal-username/your-event-slug
```

## Run on port 7610

### Development spells

From `frontend/`:

```bash
npm run spell -- awaken
npm run spell -- "raise the observatory"
```

Both incantations start Vite with hot reload, bound to `0.0.0.0:7610`. For the interactive devops panel, use:

```bash
npm run controlpanel
```

The panel understands these useful rites:

| Spell | Effect |
| --- | --- |
| `awaken` / `raise` | Start the Vite development server. |
| `scry` / `status` | Check whether port 7610 is listening. |
| `brew` / `build` | Create the production `dist/` artifact. |
| `ward` / `lint` | Run ESLint. |
| `omen` / `fun` | Print a random site-themed operational omen. |
| `banish` / `stop` | Stop the server started by this panel. |
| `exit` | Close the panel and clean up its server process. |

The command-line grimoire lives at `frontend/scripts/spell.mjs` and uses only Node’s built-in modules.

### Deploy to Vercel

Authenticate and link the repository once from the repository root if that has not already been done:

```bash
npx vercel login
npx vercel link
```

Then deploy the production site with the npm command:

```bash
cd frontend
npm run deploy
```

From the repository root, use the equivalent:

```bash
npm --prefix frontend run deploy
```

The deploy script runs `vercel deploy --prod --yes` from the repository root, so it uses the existing root `vercel.json` and its `frontend/dist/` build configuration. The same action is available inside the control panel as `deploy` or `publish`.

For a simple hosted process:

```bash
npm run preview -- --host 0.0.0.0 --port 7610
```

The site will be available at `http://<server-ip>:7610`. Open TCP port 7610 in the server firewall/security group if it is not already allowed.

For development instead, use:

```bash
npm run dev -- --host 0.0.0.0
```

Vite is configured with `strictPort`, so it will stop if 7610 is occupied rather than silently selecting another port.

## Check the port

```bash
lsof -nP -iTCP:7610 -sTCP:LISTEN
```

After changing source files, rebuild before restarting the preview process:

```bash
npm run build
```
