# Get Help Funnel + Admin Setup

Lead-gen funnel at `/get-help`, admin panel at `/admin`.

## One-time setup

### 1. Create D1 database

```bash
npm run d1:create
```

Copy the `database_id` from the output into `wrangler.jsonc` at `d1_databases[0].database_id` (replace `REPLACE_WITH_D1_ID`).

### 2. Initialize schema (remote)

```bash
npm run d1:init
```

### 3. Set secrets

```bash
npx wrangler secret put ADMIN_PASSWORD
# paste: Bdi$Admin-2026-Leads!

npx wrangler secret put SESSION_SECRET
# paste any long random string (e.g. `openssl rand -hex 32`)
```

### 4. Deploy

```bash
npm run deploy
```

## Local development

```bash
npm run d1:init:local   # first time only
npm run preview         # runs next build + wrangler dev
```

For local runs, create `.dev.vars`:

```
ADMIN_PASSWORD=Bdi$Admin-2026-Leads!
SESSION_SECRET=local-dev-secret
```

## Admin

- URL: `/admin/login`
- Password: whatever you set as `ADMIN_PASSWORD`
- Configure Zapier webhook URL from the admin dashboard (stored in D1 `settings` table)

## Webhook payload

`POST <webhook_url>` with JSON body:

```json
{
  "has_mca": "yes",
  "debt_range": "100-500k",
  "business_name": "Acme LLC",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@acme.com",
  "phone": "(555) 555-5555",
  "source": "get-help",
  "submitted_at": "2026-04-13T12:00:00.000Z",
  "ip": "1.2.3.4"
}
```

Leads are saved to D1 regardless of webhook success/failure.
