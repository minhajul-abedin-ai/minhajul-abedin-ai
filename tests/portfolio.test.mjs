import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PROJECT_CATALOG, safeRepoName, repoUrl, categoriseRepo, normaliseRepo, filterAndSort } from '../site/app.mjs';

const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../site/styles.css', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../.github/workflows/portfolio-pages.yml', import.meta.url), 'utf8');

test('website contains visitor journey, repository explorer, and contact', () => {
  for (const id of ['main', 'featured', 'explore', 'journey', 'skills', 'contact', 'repoGrid', 'repoSearch', 'repoFilters']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<a class="skip-link"/);
  assert.match(html, /aria-expanded="false"/);
});

test('public fallback includes the confirmed nine project repositories but no private eBay automation', () => {
  assert.equal(PROJECT_CATALOG.length, 9);
  assert.ok(PROJECT_CATALOG.some(x => x.name === 'HR-Employee-Attrition'));
  assert.ok(PROJECT_CATALOG.some(x => x.name === 'ConsensusTree-AI'));
  assert.ok(!PROJECT_CATALOG.some(x => /ebay/i.test(x.name)));
  assert.equal(new Set(PROJECT_CATALOG.map(x => x.name)).size, 9);
});

test('normaliseRepo excludes private and profile repositories', () => {
  assert.equal(normaliseRepo({ name: 'secret', private: true }), null);
  assert.equal(normaliseRepo({ name: 'minhajul-abedin-ai' }), null);
  assert.equal(normaliseRepo({ name: '../../evil' }), null);
  assert.equal(normaliseRepo({ name: 'safe', owner: { login: 'someone-else' } }), null);
});

test('safe public repository URL generation', () => {
  assert.equal(repoUrl('ConsensusTree-AI'), 'https://github.com/minhajul-abedin-ai/ConsensusTree-AI');
  assert.equal(repoUrl('javascript:alert(1)'), null);
  assert.equal(repoUrl('..'), null);
  assert.equal(safeRepoName('valid-repo.1'), true);
});

test('search and category filtering work for fallback and new projects', () => {
  const repos = PROJECT_CATALOG.map(normaliseRepo);
  assert.equal(filterAndSort(repos, 'RAG').length, 1);
  assert.ok(filterAndSort(repos, '', 'ai').every(r => r.category === 'ai'));
  assert.equal(filterAndSort(repos, 'no-such-project').length, 0);
  const sorted = filterAndSort(repos, '', 'all', 'name');
  assert.equal(sorted[0].label, 'ASP.NET Core / Azure Pipelines Sample');
  assert.equal(categoriseRepo({ name:'new-ontology', topics:['semantic-web'] }), 'knowledge');
});

test('static site has responsive and reduced-motion styles', () => {
  assert.match(css, /@media\(max-width:610px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
});

test('deployment runs automated tests and publishes only the site directory', () => {
  assert.match(workflow, /node --test/);
  assert.match(workflow, /path: site/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
