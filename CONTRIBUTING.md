# Contributing to DropZone

Merci de contribuer au projet DropZone !

Ce document définit les règles à respecter pour participer
au développement du projet.

## 1. Organisation des branches

La branche `main` contient uniquement du code validé.

Il est interdit de travailler directement sur `main`.
Chaque modification doit être réalisée sur une branche dédiée.

Convention de nommage :

| Préfixe | Utilisation |
|---|---|
| `feat/` | Nouvelle fonctionnalité |
| `fix/` | Correction d'un bug |
| `docs/` | Documentation |
| `test/` | Ajout ou modification de tests |
| `refactor/` | Refactorisation du code |
| `chore/` | Maintenance et configuration |

Exemples :

- `feat/add-drop-filter`
- `fix/order-stock-validation`
- `docs/update-readme`
- `test/add-api-tests`

Créer une branche depuis `main` à jour :

```bash
git switch main
git pull origin main
git switch -c feat/nom-de-la-branche
```