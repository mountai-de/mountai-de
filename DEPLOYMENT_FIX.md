# Deployment Fix: CSS-Problem in Coolify behoben

## Problem

Die MountAI-Website lief in Coolify ohne CSS-Styling (weißer Hintergrund mit Plain Text), während die GitHub Pages Version korrekt funktionierte.

## Ursache

Der `base`-Pfad in [`astro.config.mjs`](astro.config.mjs) war hardcodiert auf `/mountai-de` gesetzt - korrekt für GitHub Pages, aber falsch für Coolify.

### URL-Unterschiede:

| Deployment | URL | Base-Pfad |
|------------|-----|-----------|
| GitHub Pages | `https://mountai-de.github.io/mountai-de` | `/mountai-de` |
| Coolify | `https://gh-pages.mountai.de` | `/` |

## Lösung

Implementierung einer **dynamischen Konfiguration** basierend auf Environment Variables:

### 1. Astro-Konfiguration angepasst

```javascript
// astro.config.mjs
export default defineConfig({
  site: process.env.SITE_URL || 'https://mountai-de.github.io',
  base: process.env.BASE_PATH || '/mountai-de',
  output: 'static',
});
```

### 2. GitHub Actions Workflow aktualisiert

```yaml
- name: Build Astro
  run: bun run build
  env:
    SITE_URL: https://mountai-de.github.io
    BASE_PATH: /mountai-de
```

### 3. Coolify Environment Variables

In Coolify müssen folgende ENV-Variablen gesetzt werden:

```
SITE_URL=https://gh-pages.mountai.de
BASE_PATH=/
NODE_ENV=production
```

## Nächste Schritte

Um das Problem zu beheben, führe folgende Schritte in Coolify aus:

1. **Änderungen committen und pushen:**
   ```bash
   git add .
   git commit -m "Fix: Dynamische Base-Pfad-Konfiguration für Coolify und GitHub Pages"
   git push origin main
   ```

2. **In Coolify Environment Variables setzen:**
   - Gehe zu deiner App → "Environment" Tab
   - Füge hinzu:
     - `SITE_URL` = `https://gh-pages.mountai.de`
     - `BASE_PATH` = `/`
   - Speichere die Änderungen

3. **Re-Deploy auslösen:**
   - Klicke auf "Redeploy" in Coolify
   - Warte bis der Build abgeschlossen ist

4. **Verifizierung:**
   - Öffne `https://gh-pages.mountai.de` im Browser
   - Die Seite sollte jetzt identisch zur GitHub Pages Version aussehen
   - In den DevTools (F12) → Network sollten alle CSS-Dateien mit Status 200 geladen werden

## Vorteile dieser Lösung

✅ **Eine Codebasis für beide Deployments** - kein Branch-Management  
✅ **Einfach erweiterbar** - weitere Environments können einfach hinzugefügt werden  
✅ **Standard-Pattern** - ENV-basierte Konfiguration ist Best Practice in Astro  
✅ **Wartbar** - Änderungen wirken sich automatisch auf beide Deployments aus  

## Dokumentation

- Details zur Coolify-Konfiguration: [`COOLIFY.md`](COOLIFY.md)
- GitHub Pages Setup: [`GITHUB_PAGES_SETUP.md`](GITHUB_PAGES_SETUP.md)
