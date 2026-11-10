# Minhajul Abedin — Interactive GitHub Portfolio

This folder contains a lightweight, responsive, accessible portfolio website that gives visitors a guided journey through [Minhajul Abedin's public GitHub projects](https://github.com/minhajul-abedin-ai).

## Explore

- Introductory hero, project highlights and visitor routes for recruiters, developers and researchers
- Featured AI, ML, RAG and knowledge-engineering case studies with source and quickstart links
- **Live repository browser** that fetches the owner's public GitHub repositories (never private repos) and supports search, filters and sorting
- Verified offline fallback catalog if GitHub API rate limits or network access prevent syncing
- Personal educational journey, technologies, research interests and LinkedIn contact

## Local preview

Open `site/index.html` in any modern browser, or serve `site/` using:

```bash
python -m http.server 8000 --directory site
```

Then visit `http://127.0.0.1:8000/`. No build tool, external JS dependency or authentication is needed. The optional Google Fonts stylesheet gracefully falls back to system fonts.

## Automated checks

```bash
node --test tests/*.test.mjs
node --check site/app.mjs
```

## GitHub Pages deployment

The workflow in `.github/workflows/portfolio-pages.yml` runs tests on pull requests and attempts to publish `site/` after changes are merged into `main`.

**One-time account setup** (required because this repository did not previously have GitHub Pages enabled): open repository **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then use the **Actions** tab to run “Portfolio website • test and publish” if an earlier publishing attempt failed.

On success, the normal repository-site URL is:

`https://minhajul-abedin-ai.github.io/minhajul-abedin-ai/`

Do not publish that link as live until the workflow reports success and the URL responds successfully.

### Repository coverage and privacy

The browser requests only the public GitHub endpoint `GET /users/minhajul-abedin-ai/repos?type=public`; no GitHub token is embedded or required. Private repositories are explicitly filtered out, and the source contains only a public-project fallback catalog. The listed data are GitHub's public repository metadata and do not include visitors' personal data or tracking scripts.

To add more highlighted projects, modify the static featured section in `site/index.html` and the public `PROJECT_CATALOG` in `site/app.mjs`. Newly public repositories appear automatically in the live explorer when GitHub's API responds.

**Scope:** This is a portfolio presentation, not an assertion that experimental AI prototypes have been independently validated, certified or deployed for production use. The existing `HR-Employee-Attrition` project itself was not modified.
