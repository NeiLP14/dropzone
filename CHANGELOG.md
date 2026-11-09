
# Changelog

Toutes les modifications importantes du projet DropZone sont documentées dans ce fichier.

Ce projet suit les principes de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/)
et utilise le versionnement sémantique (SemVer).

## [0.1.0] - 2026-11-09

### Ajouté
- Application DropZone permettant de gérer des drops de sneakers en édition limitée.
- API REST développée avec FastAPI.
- Interface utilisateur développée avec React, Vite et TypeScript.
- Gestion des drops avec différents statuts : upcoming, live et sold_out.
- Système de commande avec décrément atomique du stock.
- Base de données SQLite avec possibilité d'utiliser PostgreSQL.
- Insertion automatique de données de démonstration.
- Tests backend avec pytest.
- Tests frontend avec Vitest et Testing Library.
- Tests end-to-end avec Playwright.
- Documentation initiale du projet dans README.md.

### Technique
- Configuration de Ruff pour le linting et le formatage Python.
- Configuration d'ESLint et de TypeScript pour le frontend.
- Mise en place des endpoints de santé de l'API (/health et /health/ready).
