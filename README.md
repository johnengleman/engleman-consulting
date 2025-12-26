# John Engleman — Static Profile Site

Single-page, static HTML/CSS site designed to be fast, scannable, and recruiter-friendly.

## Files

- `index.html`
- `styles.css`
- `main.js`
- `January/index.html` (blog page, route: `/January`)
- `John_Engleman_Resume.pdf` (add this file)

## Resume PDF

Place your resume at the project root named:

- `John_Engleman_Resume.pdf`

The nav and contact section link to `/John_Engleman_Resume.pdf`.

## Local preview

Any static server works.

### Option A: Python

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

### Option B: Node

```bash
npx serve .
```

## Deploy

### Cloudflare Pages

- Framework preset: **None**
- Build command: _(leave empty)_
- Output directory: `/` (the root)

### Vercel

- Framework preset: **Other**
- Build command: _(leave empty)_
- Output directory: `/`

## Customize

In `index.html`, replace:

- `john.engleman@example.com`
- `https://www.linkedin.com/in/your-linkedin`
- `https://github.com/your-github`
- `https://example.com` (used in meta/JSON-LD)

No other configuration required.
