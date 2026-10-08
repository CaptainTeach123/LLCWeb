# Common Forge website

A dependency-free static site (HTML, CSS, a little JavaScript). No build step.

```
index.html        page content
css/styles.css    design (light + dark mode)
js/main.js        nav, scroll reveal, contact form
assets/           favicon
```

"Common Forge" and `hello@commonforge.example` are placeholders. Search for
them to replace with your real organization name and address.

## Preview locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Moving to your own domain later

The site uses only relative paths and no hard-coded URLs, so it works unchanged
on any host or domain. When you're ready:

1. **Host the files** anywhere that serves static sites (GitHub Pages, Netlify,
   Cloudflare Pages, Vercel, or any web host). Upload the folder as-is.
2. **Point your domain** at the host using the DNS records that host gives you
   (usually a `CNAME` for `www` and `A`/`ALIAS` records for the root domain).
   On GitHub Pages, also add a file named `CNAME` containing just your domain.
3. **Add these once the domain is live** (in `<head>` of `index.html`):
   ```html
   <link rel="canonical" href="https://YOUR-DOMAIN/">
   <meta property="og:url" content="https://YOUR-DOMAIN/">
   ```
   For link-preview images, also add `og:image` with a full `https://` URL.
4. **Contact form:** by default it opens the visitor's email app. For a real
   form, set `FORM_ENDPOINT` at the top of `js/main.js` (Formspree, Netlify
   Forms, etc.) and update `CONTACT_EMAIL`.
5. **Email on your domain** (e.g. `hello@YOUR-DOMAIN`) is set up separately
   through your domain registrar or an email provider.
