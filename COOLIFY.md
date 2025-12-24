# Coolify Deployment Guide

Dieses Dokument enthält alle Informationen für das Deployment der MountAI Website in Coolify.

## Projekt-Informationen

- **Repository:** `mountai-de/mountai-de`
- **Branch:** `main`
- **Framework:** Astro (Static Site Generator)
- **Package Manager:** Bun

## Coolify App-Konfiguration

### General Settings

| Einstellung | Wert |
|-------------|------|
| **Name** | mountai-website |
| **Repository** | mountai-de/mountai-de |
| **Branch** | `main` |
| **Build Mode** | Nixpacks (empfohlen) oder Dockerfile |

### Build Settings

| Einstellung | Wert |
|-------------|------|
| **Build Command** | `bun install && bun run build` |
| **Install Command** | `bun install` |
| **Output Directory** | `dist/` |
| **Start Command** | Nicht erforderlich (Static Site) |

### Environment Variables

| Variable | Wert | Beschreibung |
|----------|------|--------------|
| `NODE_ENV` | `production` | Production Mode |

### Deployment-Typ

Dies ist eine **Static Site** (kein Server erforderlich). Coolify kann die gebauten Dateien direkt bereitstellen.

## Alternative: Dockerfile

Wenn du einen Dockerfile verwenden möchtest, hier ein Beispiel:

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM scratch AS export
COPY --from=build /app/dist /dist
```

## Branches für verschiedene Environments (Optional)

Für separate Production/Staging/Development Environments kannst du verschiedene Branches verwenden:

| Environment | Branch | Coolify App |
|-------------|--------|-------------|
| Production | `main` | mountai-website-prod |
| Staging | `staging` | mountai-website-staging |
| Development | `dev` | mountai-website-dev |

## Deployment-Workflow in Coolify

1. **Neue App erstellen:**
   - Klicke auf "Create New App"
   - Wähle "From Git"
   - Wähle das Repository `mountai-de/mountai-de`
   - Wähle den Branch `main`

2. **Build-Konfiguration:**
   - Build Command: `bun install && bun run build`
   - Output Directory: `dist/`

3. **Deployen:**
   - Klicke auf "Deploy"
   - Coolify wird den Build ausführen und die Website bereitstellen

## Troubleshooting

### Build fehlgeschlagen

- Prüfe, ob `bun` installiert ist (wenn Nixpacks verwendet wird, sollte es automatisch funktionieren)
- Prüfe, ob alle Dependencies in `package.json` korrekt sind

### 404 Fehler nach Deployment

- Prüfe, ob die `Output Directory` auf `dist/` gesetzt ist
- Prüfe, ob der Build erfolgreich war

### Fonts werden nicht geladen

- Die Fonts sind im `public/fonts/` Ordner und sollten automatisch bereitgestellt werden
- Prüfe die Pfade in der CSS-Datei

## Links

- Astro Dokumentation: https://docs.astro.build/
- Coolify Dokumentation: https://coolify.io/docs
- Bun Dokumentation: https://bun.sh/docs
