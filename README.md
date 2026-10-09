# Miscellany of Function website

A dependency-free static site (HTML, CSS, a little JavaScript). No build step.

```
index.html        page content
css/styles.css    design (light + dark mode)
js/main.js        nav, scroll reveal, contact form
assets/           favicon
```

The site's domain is `miscellanyoffunction.com`. The contact address
`hello@miscellanyoffunction.com` (in `index.html` and `js/main.js`) only works once
you've set up email for that domain (Cloudflare Email Routing is a free option).

## Preview locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publish on GitHub Pages

1. On GitHub, open the repo's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose the branch that holds the site and the **/ (root)** folder, then **Save**.
4. After a minute or two the site is live at
   `https://<your-github-username>.github.io/<repo-name>/`
   (for this repo: `https://captainteach123.github.io/LLCWeb/`).

Later pushes to that branch redeploy automatically. The site uses only relative
paths, so it works under the `/<repo-name>/` subpath. `.nojekyll` tells Pages
to serve the files exactly as they are.

## Publish on Cloudflare Pages

No build step is needed, so this takes a few minutes.

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git**, and authorize Cloudflare to read this GitHub repo.
2. Pick the repo and the **production branch** that holds the site.
3. Build settings: **Framework preset** `None`, **Build command** left empty,
   **Build output directory** `/` (the repo root).
4. Click **Save and Deploy**. The site goes live at
   `https://<project-name>.pages.dev`, and every later push to that branch
   redeploys automatically (other branches get preview URLs).

`_headers` adds basic security headers on Cloudflare and is ignored elsewhere.
Because the repo root is the site, files like `README.md` are also served;
that's harmless, but you can move the site into a `public/` folder later and
set it as the output directory if you'd like them hidden.

### Custom domain on Cloudflare

1. Open your Pages project → **Custom domains → Set up a domain** and enter
   your domain (for example `example.com` or `www.example.com`).
2. If the domain's DNS is already on Cloudflare, the records are added for you.
   Otherwise either add the `CNAME` Cloudflare shows you at your DNS provider,
   or move the domain's nameservers to Cloudflare.
3. HTTPS certificates are issued automatically.
4. Once it's live, add the canonical and `og:url` tags described below.

Once you're on Cloudflare you can turn off GitHub Pages (**Settings → Pages**)
and delete `.github/workflows/jekyll-gh-pages.yml` so the old site doesn't
keep redeploying.

## Moving to your own domain later

The site uses only relative paths and no hard-coded URLs, so it works unchanged
on any host or domain. When you're ready:

1. **Host the files** anywhere that serves static sites (Cloudflare Pages,
   GitHub Pages, Netlify, Vercel, or any web host). Upload the folder as-is.
2. **Point your domain** at the host using the DNS records that host gives you
   (usually a `CNAME` for `www` and `A`/`ALIAS` records for the root domain).
   On GitHub Pages, also add a file named `CNAME` containing just your domain.
   For Cloudflare, see the section above.
3. **Domain tags** (`canonical`, `og:url`, `robots.txt`, `sitemap.xml`) already
   point at `https://miscellanyoffunction.com/`. If the domain ever changes,
   update those four places. For link-preview images, add `og:image` with a
   full `https://` URL to a PNG or JPG (many sites don't preview SVGs).
4. **Contact form:** by default it opens the visitor's email app. For a real
   form, set `FORM_ENDPOINT` at the top of `js/main.js` (Formspree, Netlify
   Forms, etc.) and update `CONTACT_EMAIL`.
5. **Email on your domain** (e.g. `hello@YOUR-DOMAIN`) is set up separately
   through your domain registrar or an email provider.
