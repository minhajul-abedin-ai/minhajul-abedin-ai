import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PROJECT_CATALOG, safeRepoName, repoUrl, categoriseRepo, normaliseRepo, filterAndSort } from '../site/app.mjs';

const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../site/styles.css', import.meta.url), 'utf8');
const app = readFileSync(new URL('../site/app.mjs', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../.github/workflows/portfolio-pages.yml', import.meta.url), 'utf8');
const docs = readFileSync(new URL('../PORTFOLIO_README.md', import.meta.url), 'utf8');
const OWNER = 'minhajul-abedin-ai';
const publicRepo = (repo = {}) => ({ private: false, visibility: 'public', owner: { login: OWNER }, ...repo });
const curated = () => PROJECT_CATALOG.map(p => normaliseRepo(publicRepo(p))).filter(Boolean);

test('website contains visitor journey, repository explorer, and contact', () => {
  for (const id of ['main', 'featured', 'explore', 'journey', 'skills', 'contact', 'repoGrid', 'repoSearch', 'repoFilters']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<a class="skip-link"/);
  assert.match(html, /aria-expanded="false"/);
});

test('internal navigation has unique and present anchor IDs', () => {
  const ids = [...html.matchAll(/\bid="([A-Za-z0-9_-]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate id');
  const anchors = [...html.matchAll(/href="#([^"\s]+)"/g)].map(m => m[1]);
  assert.ok(anchors.length >= 7);
  for (const anchor of anchors) assert.ok(ids.includes(anchor), `missing anchor #${anchor}`);
});

test('verified public catalog covers nine public project repositories, excluding private work', () => {
  assert.equal(PROJECT_CATALOG.length, 9);
  assert.ok(PROJECT_CATALOG.some(x => x.name === 'HR-Employee-Attrition'));
  assert.ok(PROJECT_CATALOG.some(x => x.name === 'ConsensusTree-AI'));
  assert.ok(!PROJECT_CATALOG.some(x => /ebay/i.test(x.name)));
  assert.equal(new Set(PROJECT_CATALOG.map(x => x.name)).size, 9);
  assert.equal(curated().length, 9);
});

test('API metadata is fail-closed: only explicitly public repositories from account owner', () => {
  assert.equal(normaliseRepo(publicRepo({ name: 'real-repository' })).name, 'real-repository');
  assert.equal(normaliseRepo({ name: 'unknown', owner: { login: OWNER } }), null, 'missing visibility accepted');
  assert.equal(normaliseRepo(publicRepo({ name: 'private', private: true })), null);
  assert.equal(normaliseRepo(publicRepo({ name: 'contradictory', visibility: 'private' })), null);
  assert.equal(normaliseRepo(publicRepo({ name: OWNER.toUpperCase() })), null);
  assert.equal(normaliseRepo(publicRepo({ name: 'malicious', owner: { login: 'attacker' } })), null);
  assert.equal(normaliseRepo(publicRepo({ name: '../../evil' })), null);
});

test('safe public repository links and DOM text rendering', () => {
  assert.equal(repoUrl('ConsensusTree-AI'), 'https://github.com/minhajul-abedin-ai/ConsensusTree-AI');
  assert.equal(repoUrl('javascript:alert(1)'), null);
  assert.equal(repoUrl('..'), null);
  assert.equal(safeRepoName('valid-repo.1'), true);
  assert.match(app, /description\.textContent = repo\.description/);
  assert.match(app, /heading\.textContent = repo\.label/);
});

test('search, categories, and ordering work for verified public fallback projects', () => {
  const repos = curated();
  assert.equal(filterAndSort(repos, 'RAG').length, 1);
  assert.ok(filterAndSort(repos, '', 'ai').every(r => r.category === 'ai'));
  assert.equal(filterAndSort(repos, 'no-such-project').length, 0);
  const sorted = filterAndSort(repos, '', 'all', 'name');
  assert.equal(sorted[0].label, 'ASP.NET Core / Azure Pipelines Sample');
  assert.equal(categoriseRepo({ name: 'new-ontology', topics: ['semantic-web'] }), 'knowledge');
  assert.ok(filterAndSort(repos, '', 'all', 'stars').length === 9);
});

test('fallback does not pretend it knows live star counts or update times', () => {
  assert.match(app, /querySelector\('\[value="updated"\]'\)\.disabled = true/);
  assert.match(app, /querySelector\('\[value="stars"\]'\)\.disabled = true/);
  assert.match(app, /GitHub API HTTP/);
});

test('mobile layout cannot overflow from decorative background and supports reduced motion', () => {
  assert.match(css, /\.ambient-one\{[^}]*right:0/);
  assert.match(css, /html,body\{overflow-x:clip\}/);
  assert.match(css, /@media\(max-width:610px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
  assert.ok(!css.includes('fonts.googleapis.com'), 'unexpected third-party font download');
});

test('keyboard and pointer can close mobile navigation', () => {
  assert.match(app, /event\.key === 'Escape'/);
  assert.match(app, /closeMenu\(true\)/);
  assert.match(app, /!nav\.contains\(event\.target\)/);
  assert.match(app, /window\.addEventListener\('resize'/);
  assert.match(html, /id="visibleCount" aria-live="polite"/);
});

test('Pages CI tests site and skips deployment until Pages is enabled for Actions', () => {
  assert.match(workflow, /node --test/);
  assert.match(workflow, /path: site/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /pages_check:/);
  assert.match(workflow, /needs\.pages_check\.outputs\.ready == 'true'/);
  assert.match(workflow, /'404'/);
  assert.match(docs, /Settings → Pages/);
  assert.match(docs, /file:\/\//);
});