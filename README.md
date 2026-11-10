<div align="center">

# Minhajul Abedin

### AI / Machine Learning Engineering · Applied AI · RAG · Multi-Agent Systems

**London, United Kingdom** · **MSc Computer Science & Technology (Distinction)**

[**LinkedIn**](https://www.linkedin.com/in/minhajulabedinai) · [**Featured projects**](#featured-projects) · [**Technical skills**](#technical-skills) · [**All repositories**](https://github.com/minhajul-abedin-ai?tab=repositories)

</div>

---

## About me

I am a **Computer Science postgraduate and aspiring AI / Machine Learning Engineer**, interested in building AI systems that are **useful, measurable, reproducible and understandable**.

My work connects machine learning with software engineering: from training and evaluating predictive models to developing **retrieval-augmented generation (RAG) systems**, **multi-agent developer tools**, **knowledge graphs**, and Python web APIs. I care about the engineering behind a model—not just producing a prediction—including data quality, secure defaults, automated testing, documentation and honest evaluation.

**Roles of interest:** AI Engineer · Machine Learning Engineer · Applied AI / GenAI Engineer · Research Engineer / Research Assistant.

> **My approach:** Build a working baseline → test it → investigate failures → improve it → document the evidence. I distinguish tested functionality from experimental features and work that still needs independent validation.

## Interactive portfolio website — a guided tour of my GitHub

I have built a separate **responsive portfolio website** for recruiters, developers and research collaborators. Visitors can follow my journey, see curated AI engineering case studies, and **search or filter every public project repository** from one place.

- **[Explore the portfolio website](https://minhajul-abedin-ai.github.io/minhajul-abedin-ai/)** — this link becomes live once GitHub Pages is activated for this repository.
- [View the website source](site/index.html) · [GitHub Pages setup instructions](PORTFOLIO_README.md)

The website intentionally exposes **public repositories only**. Private repositories are not included.

## Start here: three projects to explore first

| Project | What it shows | Where to start |
| :--- | :--- | :--- |
| **[ConsensusTree-AI](https://github.com/minhajul-abedin-ai/ConsensusTree-AI)** | Multi-agent orchestration, code-review workflows, local CLI/SDK and a browser-based Studio | [Offline demo](https://github.com/minhajul-abedin-ai/ConsensusTree-AI#try-the-offline-demo) |
| **[Production RAG Evaluation Platform](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform)** | Retrieval evaluation, grounded answers, FastAPI, tenant isolation, security controls and persistence | [Quick start](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform#quick-start) |
| **[Cardiovascular Disease Prediction](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction)** | Data preprocessing, leakage-aware ML pipelines, baseline comparison and responsible evaluation | [Reproduce the pipeline](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction#quick-start) |

## Featured projects

### 01 · [ConsensusTree-AI — Multi-Agent Code Review & Decision Support](https://github.com/minhajul-abedin-ai/ConsensusTree-AI)

**Problem:** A single AI-generated recommendation can miss defects or offer an explanation that is difficult to verify.

**What I built:** An experimental, **local-first multi-agent council** that coordinates bounded review and decision tasks, brings together model perspectives, and produces a synthesis for **human review**. It includes a **Python CLI, SDK, local browser Studio, code-scanning workflows and offline demonstrations**.

**Engineering focus:** Agent orchestration · input boundaries · provider adapters · local-first developer tooling · automated regression tests · transparent validation.

**Explore:** [Getting started](https://github.com/minhajul-abedin-ai/ConsensusTree-AI#try-the-offline-demo) · [Code](https://github.com/minhajul-abedin-ai/ConsensusTree-AI) · [Validation checklist](https://github.com/minhajul-abedin-ai/ConsensusTree-AI/issues/1)

*Status: Experimental prerelease. Offline/unit tests and CI are available. Live-provider coverage, independently assessed accuracy and third-party security assessment are not yet established.*

### 02 · [Production RAG Evaluation Platform — Retrieval, Grounding & API Engineering](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform)

**Problem:** A RAG application needs to measure whether it retrieved the right evidence and whether its answers are grounded in that evidence.

**What I built:** A reproducible **TF-IDF retrieval and extractive-answer baseline** with chunking, source references, query guardrails and evaluation measures including **Recall@K, Precision@K, MRR, context coverage and groundedness proxies**. The FastAPI layer includes **bearer-key authentication, tenant-separated indexes, optional SQLite persistence, request limits and tenant-scoped document deletion**.

**Engineering focus:** Python · scikit-learn · FastAPI · retrieval evaluation · API security · SQLite · Docker · CI and regression testing.

**Explore:** [Architecture and setup](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform#quick-start) · [Tests](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform#tests) · [Deployment security requirements](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform/issues/5)

*Status: Tested single-process engineering baseline, not a managed or independently security-certified public SaaS service. The default answerer is extractive, not an external generative model.*

### 03 · [Cardiovascular Disease Prediction — Reproducible ML Classification](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction)

**Problem:** Classification experiments can appear accurate while hiding data leakage, unstable preprocessing or unclear evaluation.

**What I built:** An educational machine-learning workflow for cardiovascular risk classification, with **data preparation, Logistic Regression and Random Forest baselines, tuned modelling and repeatable evaluation**. The repository distinguishes original coursework results from later reproducible portfolio code.

**Engineering focus:** Python · pandas · scikit-learn · imbalanced-learning workflows · model evaluation · automated tests.

**Explore:** [Methodology and quick start](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction#quick-start) · [Limitations](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction#limitations)

*Status: Academic/educational project. Not a medical device or a tool for clinical decisions.*

### 04 · [Botanical Knowledge Ontology — Knowledge Engineering & Semantic Reasoning](https://github.com/minhajul-abedin-ai/Botanical-Knowledge-Ontology)

**Problem:** Structured knowledge is more useful when its concepts, relationships, assumptions and source evidence can be queried and inspected.

**What I built:** A **Protégé-compatible OWL/RDF ontology** representing botanical, agricultural and nutritional concepts, with documented semantic relationships, **SPARQL competency queries** and Python-based validation tools.

**Engineering focus:** Knowledge graphs · semantic modelling · OWL/RDF · SPARQL · Python · validation · source traceability.

**Explore:** [Competency queries](https://github.com/minhajul-abedin-ai/Botanical-Knowledge-Ontology#competency-query-examples) · [Validation](https://github.com/minhajul-abedin-ai/Botanical-Knowledge-Ontology#validate)

*Status: Transparent portfolio reconstruction from MSc coursework documentation, not a claim to possess the original project file or a deployed neuro-symbolic LLM.*

### 05 · [Q-Learning Gridworld — Reinforcement Learning Experiments](https://github.com/minhajul-abedin-ai/q-learning-gridworld-pathfinding)

**Problem:** Understanding reinforcement learning requires observing how exploration, rewards and learning-rate choices change an agent's behaviour.

**What I built:** A reproducible **tabular Q-learning agent** for a **5×5 Grid World** with obstacles, rewards and a jump state, including **epsilon-greedy exploration, parameter comparisons, training logs and visualisations**.

**Engineering focus:** Reinforcement learning · NumPy · experiment design · plotting · reproducibility · Python unit tests.

**Explore:** [Experiment design](https://github.com/minhajul-abedin-ai/q-learning-gridworld-pathfinding#experiments) · [Installation and demo](https://github.com/minhajul-abedin-ai/q-learning-gridworld-pathfinding#installation)

*Status: Small educational environment, not a deep-RL or general-purpose pathfinding benchmark.*

### 06 · [StratosPic — Full-Stack Python & Cloud Application Engineering](https://github.com/minhajul-abedin-ai/StratosPic)

**Problem:** Building an end-to-end application requires more than a model: authentication, data storage, request validation, media handling and maintainable deployment matter.

**What I built:** A **Flask photo-sharing application** incorporating user accounts, photo uploads, relational data, lightweight image analysis and comment-sentiment features, with support for **PostgreSQL, Docker and optional Azure storage/deployment**.

**Engineering focus:** Flask · SQLAlchemy · PostgreSQL · media processing · basic NLP · Docker · secure configuration · tests and CI.

**Explore:** [Local setup](https://github.com/minhajul-abedin-ai/StratosPic#local-setup) · [Application architecture](https://github.com/minhajul-abedin-ai/StratosPic#architecture)

*Status: Portfolio application. Image analysis and sentiment features are lightweight, not claims of a trained state-of-the-art vision model.*

## Other engineering work

| Project | Focus |
| :--- | :--- |
| **[RiftReign: Space Shooter](https://github.com/minhajul-abedin-ai/RiftReign-Space-Shooter)** | Kotlin/Android offline-first game, game-state architecture, progression, Gradle and Android build CI. [Build instructions](https://github.com/minhajul-abedin-ai/RiftReign-Space-Shooter#-build-instructions). Android compilation is verified; device/gameplay verification remains separate. |
| **[ASP.NET Core / Azure Pipelines sample](https://github.com/minhajul-abedin-ai/pipelines-dotnet-core)** | Learning/sample project for ASP.NET Core MVC, modern .NET builds and CI/CD. Based on a Microsoft documentation example; not presented as an original product. |
| **[Employee Attrition / Explainable ML](https://github.com/minhajul-abedin-ai/HR-Employee-Attrition)** | Related research-oriented work exploring explainable employee attrition prediction. |

## Engineering evidence: tests, builds and reproducibility

The badges link directly to each repository's **GitHub Actions workflows**. They show configured automated checks, **not** independent product certification or proof that every deployment scenario has been tested.

| Repository | GitHub Actions |
| :--- | :--- |
| [ConsensusTree-AI](https://github.com/minhajul-abedin-ai/ConsensusTree-AI) | [![Python tests](https://github.com/minhajul-abedin-ai/ConsensusTree-AI/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/ConsensusTree-AI/actions/workflows/tests.yml) |
| [Production RAG](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform) | [![RAG CI](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform/actions/workflows/ci.yml) |
| [Cardiovascular ML](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction) | [![ML tests](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction/actions/workflows/tests.yml) |
| [Botanical Ontology](https://github.com/minhajul-abedin-ai/Botanical-Knowledge-Ontology) | [![Ontology tests](https://github.com/minhajul-abedin-ai/Botanical-Knowledge-Ontology/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/Botanical-Knowledge-Ontology/actions/workflows/tests.yml) |
| [Q-Learning](https://github.com/minhajul-abedin-ai/q-learning-gridworld-pathfinding) | [![RL tests](https://github.com/minhajul-abedin-ai/q-learning-gridworld-pathfinding/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/q-learning-gridworld-pathfinding/actions/workflows/tests.yml) |
| [StratosPic](https://github.com/minhajul-abedin-ai/StratosPic) | [![StratosPic CI](https://github.com/minhajul-abedin-ai/StratosPic/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/StratosPic/actions/workflows/ci.yml) |
| [RiftReign Android build](https://github.com/minhajul-abedin-ai/RiftReign-Space-Shooter) | [![Android build](https://github.com/minhajul-abedin-ai/RiftReign-Space-Shooter/actions/workflows/android-build.yml/badge.svg?branch=main)](https://github.com/minhajul-abedin-ai/RiftReign-Space-Shooter/actions/workflows/android-build.yml) |
| [ASP.NET Core sample](https://github.com/minhajul-abedin-ai/pipelines-dotnet-core) | [![.NET build](https://github.com/minhajul-abedin-ai/pipelines-dotnet-core/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/minhajul-abedin-ai/pipelines-dotnet-core/actions/workflows/build.yml) |

## Technical skills

| Area | Tools and methods |
| :--- | :--- |
| **Languages & data** | Python, SQL, C#, Kotlin, NumPy, pandas |
| **Machine learning** | scikit-learn, classification, evaluation metrics, feature engineering, explainable ML, basic reinforcement learning |
| **Applied AI & retrieval** | RAG, TF-IDF retrieval, grounded answer evaluation, multi-agent orchestration, prompt/input guardrails |
| **Knowledge engineering** | Ontology modelling, OWL, RDF, SPARQL, knowledge graphs |
| **Backend & APIs** | FastAPI, Flask, REST APIs, SQLite, PostgreSQL, SQLAlchemy |
| **Developer tools** | Git, GitHub, GitHub Actions, pytest, Docker, Azure-oriented workflows, CI/CD |

*These are tools and topics demonstrated across academic and portfolio work; depth of experience varies by technology.*

## Education & research interests

**MSc Computer Science & Technology — Distinction**  
Ulster University, London, United Kingdom

**BSc Computer Science & Engineering**  
Port City International University, Bangladesh

I am particularly interested in **explainable and trustworthy ML, efficient medical AI, AI model evaluation, knowledge representation, multi-agent decision support, and reliable forecasting under distribution shift**.

My research direction emphasises *rigorous baselines, transparent limitations, resource-aware experimentation and reproducible evidence*.

## For recruiters, collaborators and reviewers

- **Hiring managers:** begin with [ConsensusTree-AI](https://github.com/minhajul-abedin-ai/ConsensusTree-AI) for AI developer tooling, [Production RAG](https://github.com/minhajul-abedin-ai/Production-Rag-Evaluation-Platform) for applied AI/API engineering, or [Cardiovascular ML](https://github.com/minhajul-abedin-ai/Cardiovascular-Disease-Prediction) for ML fundamentals.
- **Developers:** each featured repository includes documentation and starting instructions; look at test workflows and limitations alongside the implementation.
- **Research collaborators:** I welcome discussions about explainable AI, evaluation methodology, knowledge graphs and resource-aware ML.

### Connect

**[LinkedIn](https://www.linkedin.com/in/minhajulabedinai)** · **[GitHub repositories](https://github.com/minhajul-abedin-ai?tab=repositories)** · **[Open-source issues](https://github.com/minhajul-abedin-ai/ConsensusTree-AI/issues)**

---

<div align="center">

*Engineering-first AI. Reproducible work. Clear evidence. Continuous improvement.*

</div>
