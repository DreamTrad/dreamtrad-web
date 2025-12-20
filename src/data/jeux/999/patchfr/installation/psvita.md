# Instructions patch PS Vita

Une fois que vous avez téléchargé le patch, il faudra d’abord l’extraire car c’est un dossier compressé zip.

## Prérequis

- Vous devez avoir le jeu "The Nonary Games" installé sur votre PS Vita
- Votre PS Vita doit être en [Custom Firmware](https://enso.henkaku.xyz/)
- Vous devez avoir ces deux plugins installés :
    - [RePatch](https://github.com/dots-tb/rePatch-reDux0/releases)
    - [0syscall6](https://github.com/SKGleba/0syscall6/releases)

Les plugins sont des fichiers .skprx à placer dans la partition ur0:

Avec **Vitashell** (le gestionnaire de fichiers), copiez les fichiers SKPRX dans le dossier **ur0\:tai/**

![Image plugin vita 1](/jeux/999/patchfr/installation/plugin_vita_1.webp)

Ensuite, il faut éditer le fichier texte : **config.txt**
Rajouter 2 lignes en dessous de la catégorie ***KERNEL**
- **ur0:tai/repatch.skprx**
- **ur0:tai/0syscall6.skprx**

![Image plugin vita 2](/jeux/999/patchfr/installation/plugin_vita_2.webp)

Une fois l’installation terminée, **redémarrez votre console.**

## Installer le patch

Décompresser l'archive et transférer le contenu dans la partition ux0:

![Image schéma arborescence fichiers](/jeux/999/patchfr/installation/patch_vita_1.webp)

Si le jeu d'origine est **la version US, renommer le dossier** PSCB01063 en PCSE01006

*Optionnel :* Vous pouvez supprimer les fichiers originaux pour économiser 1.2 Go. Vous pouvez y accéder via ce chemin : **ux0:/app/PCSB01063/[*].psarc**
