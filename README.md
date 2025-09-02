# UMMTO Nouvelle Website

Site web moderne et professionnel pour l'Université Mouloud Mammeri de Tizi-Ouzou avec portail étudiant et calendrier des événements.

## Fonctionnalités

- **Design responsive** : Optimisé pour tous les appareils
- **Navigation améliorée** : Menu intuitif avec recherche intégrée
- **Portail étudiant** : Connexion, tableau de bord, cours, notes, ressources
- **Calendrier des événements** : Vue calendrier, liste des événements, ajout d'événements
- **SEO optimisé** : Balises meta, structure sémantique
- **Accessibilité** : Conformité aux standards d'accessibilité

## Structure du projet

```
ummto_new_website/
├── index.html              # Page d'accueil
├── css/
│   └── style.css          # Styles principaux
├── js/
│   └── script.js          # JavaScript principal
├── images/                # Images et médias
├── pages/                 # Pages supplémentaires
│   └── contact.html       # Page de contact
├── student-portal/        # Portail étudiant
│   ├── index.html
│   ├── portal.css
│   └── portal.js
├── calendar/              # Calendrier des événements
│   ├── index.html
│   ├── calendar.css
│   └── calendar.js
└── README.md              # Ce fichier
```

## Images requises

Placez les images suivantes dans le dossier `images/` :

- `logo.png` : Logo de l'université (768x170px recommandé)
- `slide1.jpg` : Image pour le slider d'accueil (1200x400px)
- `slide2.jpg` : Deuxième image pour le slider
- `faculties.jpg` : Image pour la section facultés
- `dspace.jpg` : Image pour DSpace
- `messaging.jpg` : Image pour la messagerie
- `news1.jpg` : Image pour les actualités
- `favicon.ico` : Icône du site (32x32px)

## Comment utiliser

1. **Installation locale** :
   - Ouvrez `index.html` dans votre navigateur web
   - Ou utilisez un serveur local (recommandé pour le portail étudiant)

2. **Serveur local** :
   ```bash
   # Avec Python
   python -m http.server 8000

   # Avec Node.js
   npx http-server

   # Puis ouvrez http://localhost:8000
   ```

## Fonctionnalités du portail étudiant

- **Connexion** : Utilisez les identifiants de test :
  - Username: `student1` ou `student2`
  - Password: `password123`
- **Tableau de bord** : Vue d'ensemble des cours, notes, ressources
- **Cours** : Accès aux matières avec progression
- **Notes** : Consultation des résultats
- **Ressources** : Bibliothèque numérique, forums

## Calendrier des événements

- **Vue calendrier** : Navigation par mois
- **Liste des événements** : Événements à venir
- **Ajout d'événements** : Formulaire pour créer de nouveaux événements
- **Détails des événements** : Modal avec informations complètes

## Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, animations
- **JavaScript ES6** : Interactivité, DOM manipulation
- **Responsive Design** : Media queries

## Améliorations apportées par rapport au site original

1. **Design moderne** : Interface propre et professionnelle
2. **Navigation améliorée** : Menu organisé avec recherche
3. **Fonctionnalités interactives** : Sliders, tabs, modals
4. **Portail étudiant complet** : Gestion des cours et notes
5. **Calendrier intégré** : Gestion des événements
6. **SEO optimisé** : Balises meta, structure optimisée
7. **Accessibilité** : ARIA labels, navigation clavier
8. **Performance** : Code optimisé, lazy loading

## Personnalisation

- **Couleurs** : Modifiez les variables CSS dans `style.css`
- **Contenu** : Éditez les textes dans les fichiers HTML
- **Fonctionnalités** : Ajoutez du JavaScript dans les fichiers appropriés

## Support

Pour toute question ou amélioration, contactez l'équipe de développement.

---

**Note** : Ce site est une version améliorée du site original https://www.ummto.dz/ avec des fonctionnalités supplémentaires pour une meilleure expérience utilisateur.