# Instructions pour patcher manuellement sur PC et steamdeck

Une fois que vous avez téléchargé le patch, il faudra d’abord l’extraire car c’est un dossier compressé zip.

Si le patch automatique ne fonctionne pas pour vous, vous pouvez toujours appliquer le patch manuellement. Vous aurez besoin xDelta pour appliquer les patchs sur les fichiers du jeu.

Vous pouvez trouver ici une version graphique de l’utilitaire, récupérer la dernière version de l’exécutable compatible avec votre système : [DeltaPatcher](https://github.com/marco-calautti/DeltaPatcher/releases)


| Fichier de patch              | Fichier du jeu            | Fonction                                                                                 |
|-------------------------------|---------------------------|------------------------------------------------------------------------------------------|
| Launcher.exe.xdelta           | Launcher.exe              | Traduit le launcher du jeu, là où on choisit entre 999 et VLR.                           |
| ze1.exe.xdelta                | ze1.exe                   | Traduit le "yes/no" des choix des menus, et le nom des lieux dans le menu "carte” d" 999 |
| ze1_data.bin.xdelta           | ze1_data.bin              | Traduit tout le reste de 999                                                             |
| ze2_data_en_us.bin.xdelta     | ze2_data_en_us.bin        | Traduit tout VLR                                                                         |


![Image Delta Patcher](/assets/jeu/999/jeufr/installation/deltapatcher.webp)

Pour chaque fichier, il faut faire ceci :
- Dans **"Original file"**, indiquez le chemin du **fichier du jeu** correspondant.
- Dans **"XDelta patch"**, indiquez le chemin du fichier de patch, donc **le fichier ".xdelta"**.

Le logiciel va peut-être être dans un état de plantage pour "ze1_data.bin" et "ze2_data_en_us.bin", c’est *normal*, les fichiers sont gros, attendez juste.
