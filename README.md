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

## Journal Sweetlandia

La page `/projets/sweetlandia.html` est désormais le journal officiel du projet.

Les articles sont placés dans :

```text
src/content/sweetlandia/
```

Chaque article Markdown génère automatiquement une page à l’adresse :

```text
/projets/sweetlandia/<identifiant>/
```

Le schéma des articles prévoit : `title`, `description`, `publishedAt`, `image`, `imageAlt`, `categories`, `phase`, `featured` et `draft`.

Le dossier `src/content/blog/` reste disponible pour de futurs articles généraux sur Blender, l’IA générative ou l’impression 3D.

## Analytics et retours visiteurs

- GoatCounter : `https://trafalgar-d-lad.goatcounter.com/`
- Endpoint de comptage : `https://trafalgar-d-lad.goatcounter.com/count`
- Formulaire d’avis Formspree : `https://formspree.io/f/xnjevark`
- Formulaire de contact Formspree : `https://formspree.io/f/xpqjkovd`

Le suivi des pages est chargé globalement dans `src/components/Analytics.astro`.
Le formulaire d’avis se trouve dans `src/components/FeedbackForm.astro`.
