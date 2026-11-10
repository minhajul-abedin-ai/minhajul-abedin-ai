const OWNER = 'minhajul-abedin-ai';
const PROFILE_REPO = OWNER;

/** Explicit fallbacks are public projects only. The private eBay project is never queried. */
export const PROJECT_CATALOG = Object.freeze([
  { name: 'ConsensusTree-AI', label: 'ConsensusTree AI', category: 'ai', language: 'Python', description: 'Experimental, local-first multi-agent code review and technical decision support with a CLI, SDK and browser Studio.', topics: ['multi-agent', 'code review', 'Python'], priority: 1 },
  { name: 'Production-Rag-Evaluation-Platform', label: 'Production RAG Evaluation Platform', category: 'ai', language: 'Python', description: 'RAG retrieval and grounding baseline with evaluation metrics, FastAPI, authenticated tenant isolation and reproducible tests.', topics: ['RAG', 'FastAPI', 'retrieval'], priority: 2 },
  { name: 'Cardiovascular-Disease-Prediction', label: 'Cardiovascular Disease Prediction', category: 'ai', language: 'Python', description: 'Educational disease-classification project with leakage-aware preprocessing, reproducible baselines and responsible evaluation.', topics: ['machine learning', 'scikit-learn'], priority: 3 },
  { name: 'Botanical-Knowledge-Ontology', label: 'Botanical Knowledge Ontology', category: 'knowledge', language: 'Python', description: 'Protégé-compatible ontology covering botanical and agricultural concepts, SPARQL competency queries and traceable sources.', topics: ['OWL', 'RDF', 'SPARQL'], priority: 4 },
  { name: 'q-learning-gridworld-pathfinding', label: 'Q-Learning Gridworld', category: 'ai', language: 'Python', description: 'Tabular reinforcement learning experiment in a 5×5 Grid World with exploration comparisons, training logs and visualisations.', topics: ['reinforcement learning', 'pathfinding'], priority: 5 },
  { name: 'StratosPic', label: 'StratosPic', category: 'app', language: 'HTML', description: 'Flask photo-sharing application combining account management, uploads, lightweight image analysis and comment-sentiment features.', topics: ['Flask', 'PostgreSQL', 'Docker'], priority: 6 },
  { name: 'RiftReign-Space-Shooter', label: 'RiftReign: Space Shooter', category: 'app', language: 'Kotlin', description: 'Offline-first Android arcade game with spacecraft combat, progression, persistent local state and a verified Android build workflow.', topics: ['Kotlin', 'Android', 'game'], priority: 7 },
  { name: 'HR-Employee-Attrition', label: 'HR Employee Attrition', category: 'knowledge', language: 'Python', description: 'Explainable machine-learning research and supporting work on employee attrition prediction.', topics: ['explainable AI', 'research'], priority: 8 },
  { name: 'pipelines-dotnet-core', label: 'ASP.NET Core / Azure Pipelines Sample', category: 'app', language: 'HTML', description: 'ASP.NET Core MVC and continuous integration sample adapted from Microsoft documentation, with a verified .NET build.', topics: ['C#', '.NET', 'CI/CD'], priority: 9 },
]);

const KNOWN = new Map(PROJECT_CATALOG.map(p => [p.name.toLowerCase(), p]));
const FILTERS = new Set(['all', 'ai', 'knowledge', 'app']);

export function safeRepoName(name) {
  return typeof name === 'string' && /^[a-zA-Z0-9_.-]{1,100}$/.test(name) && name !== '.' && name !== '..';
}

export function repoUrl(name) {
  return safeRepoName(name) ? `https://github.com/${OWNER}/${name}` : null;
}

export function categoriseRepo(repo) {
  const known = KNOWN.get((repo.name || '').toLowerCase());
  if (known) return known.category;
  const searchable = [...(Array.isArray(repo.topics) ? repo.topics : []), repo.language || '', repo.description || '', repo.name || ''].join(' ').toLowerCase();
  if (/ontology|knowledge.graph|semantic.web|sparql|research|publication/.test(searchable)) return 'knowledge';
  if (/machine.learning|artificial.intelligence|multi.agent|\brag\b|reinforcement|python-ai|deep.learning|forecast|nlp|llm/.test(searchable)) return 'ai';
  return 'app';
}

export function normaliseRepo(repo) {
  if (!repo || !safeRepoName(repo.name) || repo.name.toLowerCase() === PROFILE_REPO.toLowerCase()) return null;
  // Only confirmed public repositories belonging to this owner are shown.
  // Missing or contradictory visibility fields fail closed.
  if (repo.private !== false || (repo.visibility && repo.visibility !== 'public')) return null;
  if (repo.owner?.login?.toLowerCase() !== OWNER.toLowerCase()) return null;
  const known = KNOWN.get(repo.name.toLowerCase());
  const description = known?.description || (typeof repo.description === 'string' && repo.description.trim()) || 'Explore the source code, README and related development work on GitHub.';
  return {
    name: repo.name,
    label: known?.label || repo.name.replaceAll('-', ' '),
    category: categoriseRepo(repo),
    language: repo.language || known?.language || 'Repository',
    description,
    topics: Array.isArray(repo.topics) ? repo.topics.filter(x => typeof x === 'string').slice(0, 12) : (known?.topics || []),
    priority: known?.priority ?? 1000,
    stars: Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : 0,
    updated: typeof repo.pushed_at === 'string' ? Date.parse(repo.pushed_at) || 0 : 0,
    url: repoUrl(repo.name),
    fork: repo.fork === true,
  };
}

export function filterAndSort(repos, search = '', category = 'all', sort = 'featured') {
  const query = String(search || '').trim().toLocaleLowerCase();
  const filter = FILTERS.has(category) ? category : 'all';
  const result = repos.filter(p => (filter === 'all' || p.category === filter) && (!query ||
    [p.name, p.label, p.description, p.language, ...p.topics].join(' ').toLocaleLowerCase().includes(query)));
  result.sort((a, b) => {
    if (sort === 'name') return a.label.localeCompare(b.label);
    if (sort === 'stars') return b.stars - a.stars || a.priority - b.priority || a.label.localeCompare(b.label);
    if (sort === 'updated') return b.updated - a.updated || a.label.localeCompare(b.label);
    return a.priority - b.priority || a.label.localeCompare(b.label);
  });
  return result;
}

async function fetchPublicRepos() {
  const all = [];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    for (let page = 1; page <= 8; page += 1) {
      const response = await fetch(`https://api.github.com/users/${OWNER}/repos?type=public&per_page=100&page=${page}&sort=updated`, {
        headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
      });
      if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
      const batch = await response.json();
      if (!Array.isArray(batch)) throw new Error('Invalid GitHub response');
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all.map(normaliseRepo).filter(Boolean);
  } finally { clearTimeout(timeout); }
}

function buildRepoCard(repo) {
  const article = document.createElement('article');
  article.className = 'repo-tile';

  const top = document.createElement('div');
  top.className = 'repo-tile-top';
  const type = document.createElement('span');
  type.className = 'repo-type';
  type.textContent = ({ ai: 'AI / MACHINE LEARNING', knowledge: 'RESEARCH / KNOWLEDGE', app: 'APPLICATION / ENGINEERING' })[repo.category] || 'ENGINEERING';
  const glyph = document.createElement('span');
  glyph.className = 'repo-icon';
  glyph.setAttribute('aria-hidden', 'true');
  glyph.textContent = ({ ai: '◎', knowledge: '◇', app: '↗' })[repo.category] || '↗';
  top.append(type, glyph);

  const heading = document.createElement('h3');
  heading.textContent = repo.label;
  const description = document.createElement('p');
  description.textContent = repo.description;
  const bottom = document.createElement('div');
  bottom.className = 'repo-tile-bottom';
  const language = document.createElement('span');
  language.className = 'repo-lang';
  language.textContent = repo.language;
  const visit = document.createElement('a');
  visit.className = 'repo-view';
  visit.href = repo.url;
  visit.target = '_blank';
  visit.rel = 'noopener noreferrer';
  visit.textContent = 'View source ↗';
  visit.setAttribute('aria-label', `View ${repo.label} on GitHub`);
  bottom.append(language, visit);
  article.append(top, heading, description, bottom);
  return article;
}

async function initialise() {
  const el = id => document.getElementById(id);
  const grid = el('repoGrid');
  if (!grid) return;
  const filters = el('repoFilters');
  const search = el('repoSearch');
  const sort = el('repoSort');
  const status = el('syncStatus');
  const empty = el('emptyState');
  const visibleCount = el('visibleCount');
  const stat = el('repoStat');
  const nav = el('primaryNav');
  const toggle = el('menuToggle');

  let repositories = PROJECT_CATALOG.map(p => normaliseRepo({ ...p, private: false, visibility: 'public', owner: { login: OWNER } })).filter(Boolean);
  let activeFilter = 'all';
  // Fallback projects have no trustworthy live update or star metadata.
  sort.querySelector('[value="updated"]').disabled = true;
  sort.querySelector('[value="stars"]').disabled = true;

  const render = () => {
    const selected = filterAndSort(repositories, search.value, activeFilter, sort.value);
    const cards = selected.map(buildRepoCard);
    grid.replaceChildren(...cards);
    grid.setAttribute('aria-busy', 'false');
    visibleCount.textContent = String(selected.length).padStart(2, '0');
    stat.textContent = String(repositories.length).padStart(2, '0');
    empty.hidden = selected.length !== 0;
  };

  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filters.contains(button)) return;
    activeFilter = button.dataset.filter;
    for (const chip of filters.querySelectorAll('button[data-filter]')) {
      const current = chip === button;
      chip.classList.toggle('active', current);
      chip.setAttribute('aria-pressed', String(current));
    }
    render();
  });
  search.addEventListener('input', render);
  sort.addEventListener('change', render);
  toggle.addEventListener('click', () => {
    const opened = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', opened);
  });
  const closeMenu = (restoreFocus = false) => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) toggle.focus();
  };
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });
  document.addEventListener('click', event => {
    if (toggle.getAttribute('aria-expanded') === 'true' &&
        !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 880 && toggle.getAttribute('aria-expanded') === 'true') closeMenu();
  });
  document.getElementById('currentYear').textContent = String(new Date().getFullYear());

  render();
  status.textContent = 'Showing curated public repositories while checking for updates from GitHub…';
  try {
    const latest = await fetchPublicRepos();
    if (!latest.length) throw new Error('Empty public GitHub listing');
    // The GitHub API returns public repositories. The profile README is not a project card.
    const unique = new Map(latest.map(r => [r.name.toLowerCase(), r]));
    repositories = [...unique.values()];
    sort.querySelector('[value="updated"]').disabled = false;
    sort.querySelector('[value="stars"]').disabled = false;
    status.textContent = `Live GitHub directory · ${repositories.length} public project ${repositories.length === 1 ? 'repository' : 'repositories'} · search and filters ready`;
  } catch (error) {
    status.textContent = 'Live GitHub sync unavailable · showing a verified public-project collection · open GitHub for the latest list';
    if (typeof console !== 'undefined') console.info('Portfolio GitHub listing fallback:', error?.message || error);
  }
  render();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
}