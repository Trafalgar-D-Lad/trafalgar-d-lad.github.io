# Portfolio Astro — Trafalgar D. Lad

Migration du portfolio statique vers Astro, sans changement de design.

## Installation

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Images

Copier le dossier `images/` du site actuel dans `public/images/`.

## Déploiement GitHub Pages

1. Pousser le projet sur la branche `main` du dépôt `trafalgar-d-lad.github.io`.
2. Dans **Settings → Pages**, sélectionner **GitHub Actions** comme source.
3. Le workflow `.github/workflows/deploy.yml` construit et déploie automatiquement le site.

Les URLs existantes sont conservées :

- `/`
- `/projets.html`
- `/projets/sweetlandia.html`

## Futur blog

Les articles seront placés dans `src/content/blog/` en Markdown. Le fichier d’exemple est un brouillon non publié.

## Statistiques et retours

Des composants `Analytics.astro` et `FeedbackForm.astro` pourront être ajoutés lorsque les identifiants GoatCounter et Formspree seront disponibles.
