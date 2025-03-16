# Archi_app - A(I)rticleShare

Ce projet est un site de partage d’articles scientifiques qui permet aux utilisateurs de consulter et de poster des articles via une interface web simple. Le site est disponible à l'adresse suivante : https://a-i-rticleshare.onrender.com .
Voici un résumé des principaux choix de mise en œuvre et de la structure de données utilisée. 

## Présentation du Projet
A(I)rticleShare offre une plateforme intuitive pour partager et consulter des articles scientifiques. Les utilisateurs peuvent ajouter un nouvel article en renseignant leur pseudo, le titre, le lien de l’article et une image associée (par défaut “img/arxiv.png”). Les articles sont ensuite affichés dans une liste, triée par date décroissante.

## Technologies Utilisées
- HTML/CSS : La structure et le style de la page sont définis dans le fichier index.html avec une feuille de style associée.
- JavaScript (Front-End) : Le fichier script.js gère l’interactivité de la page, notamment la récupération des articles depuis le serveur, le tri par date, et l’ajout de nouveaux articles via des appels fetch.
- Node.js et Express (Back-End) : Le serveur, implémenté dans index.js, expose plusieurs routes pour gérer les opérations de création et de lecture sur les articles partagés.

## Fonctionnalités Principales
- Affichage des Articles : Les articles sont récupérés depuis le serveur via l’endpoint /msg/getAll et affichés sur la page avec leur titre, image et métadonnées (auteur et date de publication).
- Ajout d’Articles : Un formulaire permet aux utilisateurs de soumettre de nouveaux articles. Les données saisies sont envoyées au serveur via un appel fetch à l’endpoint /msg/post, qui ajoute l’article dans la liste.
- Tri et Mise à Jour : Les articles sont triés par date décroissante pour afficher les plus récents en premier. Un bouton “Mise à jour” permet de rafraîchir la liste.
- Mode Sombre : Un bouton dynamique dans le header permet de basculer entre le mode clair et le mode sombre.

## Choix Techniques et Structure de Données
- Structure de Données : Les articles sont stockés dans un tableau JavaScript (allMsgs) côté serveur. Chaque article est représenté par un objet avec les propriétés suivantes :
    - title : Titre de l’article.
    - url : Lien vers l’article.
    - image : Chemin vers l’image de prévisualisation.
    - posted_by : Pseudo de l’utilisateur qui a partagé l’article.
    - date : Date de publication (format “YYYY-MM-DD HH:MM:SS”).
- API REST : Le serveur Express expose plusieurs endpoints :
    - /msg/getAll : récupération de tous les articles.
    - /msg/post : Ajout d’un nouvel article via les paramètres GET.
- Mise en œuvre Front-End :
    - Faire des appels fetch vers le serveur pour récupérer et afficher les articles.
    - Gérer l’envoi des nouveaux articles et réinitialiser le formulaire après soumission.
    - Implémenter des fonctions utilitaires comme le tri par date et le formatage de celle-ci.


