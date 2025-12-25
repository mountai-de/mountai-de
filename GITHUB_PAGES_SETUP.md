# GitHub Pages Setup

## Aktuelle Konfiguration

Die Website ist nun für GitHub Pages konfiguriert und wird unter folgender URL erreichbar sein:

**https://mountai-de.github.io/mountai-de**

## Vorgenommene Änderungen

### 1. GitHub Actions Workflow
**Datei:** `.github/workflows/deploy-pages.yml`

- Umstellung von npm auf Bun
- Verwendung von `oven-sh/setup-bun@v2` statt `actions/setup-node@v4`
- Build-Kommandos: `bun install --frozen-lockfile` und `bun run build`

### 2. Astro-Konfiguration
**Datei:** `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://mountai-de.github.io',  // GitHub Pages URL
  base: '/mountai-de',                    // Repository-Name als Base-Path
  output: 'static',
});
```

### 3. CNAME-Datei entfernt
**Datei:** `public/CNAME` wurde gelöscht

- CNAME wird nur für Custom Domains benötigt
- Für GitHub Pages (github.io) nicht erforderlich

## Nächste Schritte

### Deployment testen

1. **Änderungen committen und pushen:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment - migrate to Bun"
   git push origin main
   ```

2. **GitHub Actions prüfen:**
   - Gehe zu: https://github.com/mountai-de/mountai-de/actions
   - Der Workflow "Deploy to GitHub Pages" sollte automatisch starten
   - Warte bis der Build erfolgreich ist (grüner Haken)

3. **GitHub Pages aktivieren (falls noch nicht geschehen):**
   - Gehe zu: Repository Settings → Pages
   - Unter "Source" sollte "GitHub Actions" ausgewählt sein

4. **Website aufrufen:**
   - Nach erfolgreichem Deployment: https://mountai-de.github.io/mountai-de

## Troubleshooting

### Build schlägt fehl
- Prüfe die Logs in GitHub Actions
- Stelle sicher, dass `bun.lock` im Repository ist

### 404 Fehler
- Prüfe ob der `base`-Pfad in `astro.config.mjs` korrekt ist (`/mountai-de`)
- Stelle sicher, dass GitHub Pages aktiviert ist

### Blank Page
- Prüfe Browser Console auf Fehler
- Asset-Pfade könnten falsch sein - prüfe `base` Konfiguration

## Migration zu Custom Domain (Optional)

Wenn du später auf `mountai.de` umstellen möchtest:

### 1. CNAME-Datei wiederherstellen
```bash
echo "mountai.de" > public/CNAME
# oder: echo "www.mountai.de" > public/CNAME
```

### 2. astro.config.mjs anpassen
```javascript
export default defineConfig({
  site: 'https://mountai.de',  // Deine Custom Domain
  base: '/',                    // Root-Path für Custom Domain
  output: 'static',
});
```

### 3. DNS-Einstellungen bei deinem Domain-Provider

Für Apex Domain (`mountai.de`):
```
Type: A Record
Host: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

Für www Subdomain (`www.mountai.de`):
```
Type: CNAME
Host: www
Value: mountai-de.github.io
```

### 4. GitHub Pages Custom Domain konfigurieren
- Repository Settings → Pages → Custom Domain
- Trage `mountai.de` oder `www.mountai.de` ein
- Aktiviere "Enforce HTTPS"

## Coolify als Alternative

Für Coolify-Deployment siehe [`COOLIFY.md`](COOLIFY.md).

Die Hauptunterschiede:
- **GitHub Pages:** Kostenlos, nur statische Sites, `github.io` oder Custom Domain
- **Coolify:** Self-hosted, mehr Kontrolle, benötigt eigenen Server

Beide können parallel betrieben werden.
