# Lancer le site en local

installez node.js : https://nodejs.org/fr

Si vous avez déjà nodejs, il vous faut **nodejs version 20** minimum.

Un redémarrage sera sûrement nécessaire pour avoir la commande npm reconnu par le système.

Ouvrez un invité de commande dans le dossier racine du projet, puis tapez :

    npm install

Cette commande est nécessaire que la première fois, ou quand des modules ont été ajoutés. Puis faites cette commande :

    npx next dev -p 3001

# Participer à la rédaction du contenu

## Autour de la rédaction du contenu

Vous pouvez aller sur le site, sur la page recrutement dans [la partie des tâches pour le site internet](https://dreamtrad.fr/recrutement) pour voir ce qu’il y a à faire.

Si vous voulez proposer une amélioration ou proposer du contenu, vous pouvez passer par le [discord](https://discord.gg/gsuAz4DK4p) pour en discuter, et sinon directement faire via une [issue github](https://github.com/DreamTrad/dreamtrad-web/issues/new/choose)

## Si vous voulez ajouter du contenu via un pull request au lieu des issue

Pour le contenu, il y a 3 actions que vous pourriez être amenées à faire.
1. Éditer des fichiers markdown
2. Éditer des fichiers json/js
3. Ajouter des fichiers (images)

### Markdown

Ce sont les fichiers au format "article".

La syntaxe du markdown est simple. Vous pourrez trouver des guides facilement sur internet, voire des éditeurs de textes capables de convertir du texte type Word en Markdown.

Il n’y a pour l’instant que 2 spécificités au Markdown du site. La première c’est qu’il est possible de mettre de l’HTML si besoin. La deuxième c’est la balise custom pour les spoilers :

```markdown
:::spoiler[nom de l’élément à mettre dans le spoiler]
Le contenu du spoiler
:::
```

Vous pouvez regarder comment sont faits des Markdown déjà présents sur le site : la [page d’installation Vita du patch de 999](https://github.com/DreamTrad/dreamtrad-web/blob/contenu/src/data/jeux/999/jeufr/installation/psvita.md) ou la [page de l’échappatoire de la cabine de 3ème classe de 999](https://github.com/DreamTrad/dreamtrad-web/blob/contenu/src/data/jeux/999/guide/echappatoires/cabine_de_3eme_classe.md)

Cliquez sur "preview" et "code" pour passer d’une vue à l’autre sur les exemples, et sur vos modifications en cours d’un fichier.

### JSON/JS

Ce sont des textes qui vont être inséré de manière structurée dans la page. Suivant les champs, du markdown peut être accepté.
Il suffit de remplir tout ce qui est entre guillemet "" avec du texte. Et parfois mettre true ou false pour un argument.
Ici vous aurez l’exemple de la [page des succès de 999](https://github.com/DreamTrad/dreamtrad-web/blob/contenu/src/data/jeux/999/guide/succes.js)

### Ajouter des fichiers

S’il manque des fichiers Markdown ou JSON dont vous voulez rédiger le contenu : Demandez à ce qu’on créé la page, ça sera plus simple.

Pour les images, Ça sera dans le dossier public qu’il faudra les mettre. Faite en sorte de respecter l’organisation des fichiers. Et pour indiquer le bon chemin pour vos images dans les fichiers Markdown, référez-vous aux exemples de Markdown.

