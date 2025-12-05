# Lancer le site en local

installer node.js : https://nodejs.org/fr

Si vous avez déjà nodejs, il vous faut **nodejs version 20** minimum.

Un redémarrage sera sûrement nécessaire pour avoir la commande npm reconnu par le système.

Ouvrez un invité de commande dans le dossier racine du projet, puis tapez :

    npm install

Cette commande est nécessaire que la première fois, ou quand des modules ont été ajoutés. Puis faites cette commande :

    npm run dev

Un fois la commande de npm run dev faite, vous pouvez allez sur le lien localhost qu’on vous propose dans l’invité de commande.

Si vous voulez tester sur d’autres appareils de votre réseau, comme votre téléphone par exemple, faites :

    npm run dev -- --host

Et tapez une des adresses qui n’est pas le localhost pour accéder au site depuis n’importe quel appareil de votre réseau.

# Participer à la rédaction du contenu

## Autour de la rédaction du contenu

Premièrement, vous pouvez aller voir sur le [tableau des tâches](https://github.com/orgs/DreamTrad/projects/3) ce qu’il y a à faire.

Vous pouvez créer des nouvelles tâches au besoin. Pensez bien à assigner un type pour pouvoir les filtrer par type.

Dans les tâches, les chemins des fichiers concernés par la tâches sont indiqués. Si vous avez les droits pour, vous pouvez directement modifier les fichiers sur github. Parcourez les dossiers pour atteindre le chemin du fichier, cliquez sur le petit crayon pour éditer puis cliquer sur **Commit changes…** pour publier les changements.

Pour le **commit message**, indiquez à la fin le numéro de la tâche liée de cette manière "Update README.md #24". Cela permettra d’automatiquement lié la modification à la tâche pour faciliter le suivi et la vérification. Vous pouvez modifier le message automatique "Update nom_fichier" au besoin.

Si vous voulez faire vos modifications en local, notamment pour voir en direct le rendu sur le site, soit vous savez comment faire, sinon, demandez de l’aide pour mettre en place en local le projet.

## Le contenu en lui-même

Pour le contenu, il y a 3 actions que vous pourrez être amener à faire.
1. Éditer des fichiers markdown
2. Éditer des fichiers json/js
3. Ajouter des fichiers (images)

### Markdown

Ce sont les fichiers au format "article".

La syntaxe du markdown est simple. Vous pourrez trouver des guides facilement sur internet, voire même des éditeurs de textes capable de convertir du texte type Word en Markdown.

Il n’y a pour l’instant que 2 spécificités au Markdown du site. La première c’est qu’il est possible de mettre le l’HTML si besoin. La deuxième c’est la balise custom pour les spoilers :

```markdown
:::spoiler[nom de l’élément à mettre dans le spoiler]
Le contenu du spoiler
:::
```

Vous pouvez regarder comment sont faits des Markdown déjà présents sur le site : la [page d’installation Vita du patch de 999](https://github.com/DreamTrad/dreamtrad-web/blob/contenu/src/data/jeu/999/jeufr/installation/psvita.md) ou la [page de l’échappatoire de la cabine de 3ème classe de 999](https://github.com/DreamTrad/dreamtrad-web/blob/contenu/src/data/jeu/999/guide/echappatoires/cabine_de_3eme_classe.md)

Cliquez sur "preview" et "code" pour passer d’une vue à l’autre sur les exemples, et sur vos modifications en cours d’un fichier.

### JSON/JS

Ce sont des textes qui vont être inséré de manière structuré dans la page.
Il suffit de remplir tout ce qui est entre guillemet "" avec du texte. Et parfois mettre true ou false pour un argument.
Ici vous aurez l’exemple de la [page des succès de 999](https://github.com/DreamTrad/dreamtrad-web/blob/contenu/src/data/jeu/999/guide/succes.js)

### Ajouter des fichiers

S’il manque des fichiers Markdown ou JSON dont vous voulez rédiger le contenu : Demandez à ce qu’on créé la page, ça sera plus simple.

Pour les images, Ça sera dans le dossier public qu’il faudra les mettre. Faite en sorte de respecter l’organisation des fichiers. Et pour indiquer le bon chemin pour vos images dans les fichiers Markdown, référez vous aux exemples de Markdown.

