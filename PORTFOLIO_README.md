# Minhajul Abedin — Interactive GitHub Portfolio

This folder contains a lightweight, responsive, accessible portfolio website that gives visitors a guided journey through [Minhajul Abedin's public GitHub projects](https://github.com/minhajul-abedin-ai).

## Explore

- Introductory hero, project highlights and visitor routes for recruiters, developers and researchers
- Featured AI, ML, RAG and knowledge-engineering case studies with source and quickstart links
- **Live repository browser** that fetches the owner's public GitHub repositories (never private repos) and supports search, filters and sorting
- Verified offline fallback catalog if GitHub API rate limits or network access prevent syncing
- Personal educational journey, technologies, research interests and LinkedIn contact

## Local preview

Serve `site/` over HTTP using:

```bash
python -m http.server 8000 --directory site
```

Then visit `http://127.0.0.1:8000/`. Opening the HTML using a `file://` URL is **not supported** by all browsers because JavaScript modules are subject to local-file origin restrictions. No build tool, external JavaScript libraries, authentication, or third-party font downloads are required.

## Automated checks

```bash
node --test tests/*.test.mjs
node --check site/app.mjs
```

## GitHub Pages deployment

The workflow in `.github/workflows/portfolio-pages.yml` runs tests on pull requests. On `main`, it **checks GitHub Pages configuration** and publishes `site/` only if Pages is enabled and set to GitHub Actions. If Pages is disabled, it reports setup instructions in the workflow summary and skips deployment rather than falsely reporting a broken website build.

**One-time account setup** (required because this repository did not previously have GitHub Pages enabled): open repository **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then use the **Actions** tab to run “Portfolio website • test and publish” if an earlier publishing attempt failed.

On success, the normal repository-site URL is:

`https://minhajul-abedin-ai.github.io/minhajul-abedin-ai/`

Do not publish that link as live until the workflow reports success and the URL responds successfully.

### Repository coverage and privacy

The browser requests only the public GitHub endpoint `GET /users/minhajul-abedin-ai/repos?type=public`; no GitHub token is embedded or required. Private repositories are explicitly filtered out, and the source contains only a public-project fallback catalog. Live data are accepted only for repositories explicitly identified by GitHub as public and belonging to this account. When GitHub is unreachable, recently-updated and star-based sorts are disabled because their fallback metadata would be misleading. The listed data are GitHub's public repository metadata and do not include visitors' personal data or tracking scripts.

To add more highlighted projects, modify the static featured section in `site/index.html` and the public `PROJECT_CATALOG` in `site/app.mjs`. Newly public repositories appear automatically in the live explorer when GitHub's API responds.

**Scope:** This is a portfolio presentation, not an assertion that experimental AI prototypes have been independently validated, certified or deployed for production use. The existing `HR-Employee-Attrition` project itself was not modified.