# 🍃 CannaZen — Cannabis Légal Premium

## Déploiement rapide sur Vercel (3 minutes)

### Méthode 1 : Vercel CLI (le plus rapide)

```bash
# 1. Installe Vercel CLI si pas déjà fait
npm i -g vercel

# 2. Va dans le dossier du projet
cd cannazen-deploy

# 3. Installe les dépendances
npm install

# 4. Déploie en une commande
vercel

# Réponds aux questions :
# → Set up and deploy? Y
# → Which scope? (ton compte)
# → Link to existing project? N
# → Project name? cannazen
# → Directory? ./
# → Override settings? N

# 5. Pour mettre en production :
vercel --prod
```

### Méthode 2 : GitHub + Vercel (auto-deploy)

```bash
# 1. Crée un repo GitHub
git init
git add .
git commit -m "🍃 CannaZen — Site complet"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/cannazen.git
git push -u origin main

# 2. Va sur https://vercel.com/new
# 3. Importe le repo "cannazen"
# 4. Framework: Vite → Deploy
# Terminé ! Chaque git push redéploiera automatiquement.
```

## Stack

- React 18
- Vite 6
- Vercel (hosting)
- 29 produits, 8 molécules
- 100% fonctionnel (panier, filtres, recherche, etc.)
