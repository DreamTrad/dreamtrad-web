Vu de l’extérieur, la création d’un patch pour un jeu peut être vu comme simple puisque ce n’est que remplacer un texte par un autre. Ou au contraire, ça peut être vu comme quelque chose de totalement mystique parce qu’en regardant les fichiers du jeu, c’est juste illisible quand on les ouvre avec un éditeur de texte. Ou peut-être même que vous ne vous êtes jamais posé la question, mais dans tous les cas, on va tout expliquer ici, de la toute première étape qui consiste à trouver comment accéder aux fichiers du jeu, jusqu’à la dernière étape, quand le patch est terminé et qu’il peut sortir.

## Au commencement, le jeu et ses fichiers

La première étape consiste donc à trouver un moyen d’extraire les fichiers du jeu, que ça soit le texte, ou même les images, textures, vidéos… À part dans de rares cas, ça ne sera pas directement accessible. Pour cela il faut avoir des outils ; outils qui sont soit à développer nous même, soit à trouver. Actuellement dans l’équipe, nous ne sommes pas assez compétents pour développer nous-mêmes ces outils, donc nous devons en trouver.

Nous voulons un outil, mais où le chercher, et que cherchons-nous. On peut trouver des outils dédiés à un jeu seulement. C’est souvent optimal, car l’outil va être conçu pour gérer les spécificités du jeu. Mais s’il n’y a pas d’outil spécifique au jeu, on peut alors chercher un outil spécifique au moteur du jeu. Pour faire un jeu vidéo, le plus simple est de créer ce qu’on appelle un moteur, qui va servir pour facilement designer le jeu avec son level design. Dans le cadre d’un Visual Novel, on va faire en sorte que ce moteur ait déjà toute la partie qui gère l’affichage du texte, le placement des personnages, ou la lecture de la musique soit entièrement déjà implémentée, et ce qui permet de seulement donner le fichier texte pour avoir le texte qui s’affiche, de dire une position et un sprite pour que le personnage s’affiche, ou renseigner un fichier sonore pour qu’il soit joué. Le Visual Novel étant un type de jeu vidéo très codifié, il est facile de faire un moteur réutilisable par d’autres projets. De ce fait, il existe énormément de moteurs. Et si vous avez bien compris le concept d’un moteur, si deux jeux sont faits avec le même moteur, cela veut dire qu’ils procèdent de la même manière pour afficher du texte. Si nous revenons à notre outil pour décortiquer un jeu, il devient logique qu’un outil spécifique à un moteur puisse être pertinent. Malgré tout, chaque jeu aura toujours quelques spécificités que l’outil généraliste pour le moteur ne prendra pas forcément en compte. Il y a donc des outils spécifiques à un jeu, des outils spécifiques à un moteur, et il y a une dernière catégorie qui est celle des outils spécifiques à une console. Pour récupérer les fichiers d’un jeu DS, PSVita, NES, etc, des outils spécifiques à la console vont être utilisés pour extraire les données. Ils pourront suivant les cas être couplé à des outils pour le moteur ou pour le jeu.

Maintenant qu’on a bien identifié les types d’outils, comment les trouver ? La première solution est tout simplement de taper sur internet "nom du jeu" + "tool" ou des variantes du genre. Dans le cadre des Visual Novel, il y a un site bien utile dans bien des cas, et il s’agit de VNDB, la base de données des Visual Novel. Sur la page d’un Visual Novel, on va trouver toutes les fantraductions réalisées. On peut voir ici l’exemple de la page de [Clannad](https://vndb.org/v4).

La liste des fantraductions de Clannad.

![les fantraductions de clannad](/articles-content/0002/vndb_clannad_releases.webp)

La liste des équipes ayant réalisé les fantraductions de Clannad.

![les équipes de fantraduction de clannad](/articles-content/0002/vndb_clannad_team.webp)

Donc, quand un Visual Novel est déjà fantraduit dans une langue, il peut être intéressant d’aller voir sur les sites des équipes si leurs outils ne sont pas à disposition, ou de directement les contacter pour demander de l’aide.

Sur VNDB, on peut trouver une autre information : le moteur du jeu. En allant sur la release que vous souhaitez traduire, le moteur du jeu est souvent renseigné. On peut voir que pour Clannad, c’est le moteur RealLive qui est utilisé pour la version Steam.

![Le moteur de clannad indiqué pour la version steam](/articles-content/0002/vndb_clannad_one_release.webp)

Et il y a même une page du moteur pour voir tous les autres Visual Novel fait avec ce moteur. Cela peut soit permettre d’aller voir des outils pour ces jeux, car un outil fait pour AIR fonctionnera peut-être pour Clannad, et aussi, ça permet de faire un peu de repérage pour de futurs projets qui ne demanderait pas trop d’investissements pour les mettre en place si on a déjà un outil spécifique à un moteur…

![VN populaire avec le moteur RealLive](/articles-content/0002/vndb_reallive_vn.webp)

## On a un outil, regardons comment le jeu est fait

Il y a deux types d’outils : ceux avec une interface graphique et ceux en ligne de commande. Les premiers rassurent tandis que les seconds font peur. Et pourtant, c’est bien ceux en ligne de commande qui sont préférables. Les outils à interface graphique ont le mérite d’être utilisable plus ou moins par tout le monde (suivant la qualité de l’UX). Mais le problème, c’est qu’on est dépendant de cette interface, il faut tout faire à la main pour extraire et surtout pour réinsérer les données modifiées. Et c’est là que viennent les outils en ligne de commande, donc ceux qui s’exécutent dans le terrifiant terminal. Leur avantage, c’est qu’on peut les intégrer à d’autres outils. Et c’est ce que nous faisons dans nos projets, nous reviendrons sur cela plus tard.

Bon, nous avons extrait les données du jeu avec notre outil. Il faut désormais étudier ce que nous avons extrait pour essayer de comprendre la structure du jeu, l’organisation des fichiers, les fichiers qui vont devoir être modifiés… Commençons par le plus simple : les images. La plupart du temps, elles seront déjà dans un format exploitable par des éditeurs d’image. Il peut arriver que les images soient dans des formats particuliers comme le format DDS. Tous les logiciels d’images ne les ouvrent pas ce qui peut déjà être un problème. Et c’est une fois avoir modifié l’image qu’il faut faire attention, car il faut choisir le bon format de compression de l’image DDS.

![format dds](/articles-content/0002/dds.webp)

Avant de se pencher au cœur du sujet dans le cas des VN, il y a certain type de données dont on ne pense pas forcément, et pourtant c’est presque tout le temps une donnée à modifier : La police du jeu.

![une police d’un jeu](/articles-content/0002/font.webp)

Comme vous pouvez le voir sur cette image, la version anglaise n’a pas pensé à nous les français, avec nos é, î, à ou encore pire le œ. Donc, si nous voulons que nos beaux caractères français apparaissent en jeu, il va falloir modifier la police. La manière dont se modifie une police dépend de la manière dont elle est implémentée. La plupart du temps, la police sera une image sur laquelle il faudra ajouter nos caractères, et ensuite dans un autre fichier, on va retrouver la logique qui permet de dire quel caractère est placé où sur l’image. Ça peut être long comme tâche, et parfois il y a plusieurs polices dans le jeu, et il faut donc faire cet exercice pour chaque police. Il peut y avoir d’autres complications avec les polices, mais restons simple pour cet article.

Maintenant, intéressons-nous au texte. Pour chaque jeu, ça sera différent, mais le concept restera le même, donc prenons un exemple.

![exemple texte VLR](/articles-content/0002/text_vlr.webp)

Ici nous pouvons déjà voir que le texte est structuré. La structure sera différente pour chaque jeu. Pour ce cas, on a un ID, et dans l’accolade de l’ID le nom du personnage et le texte du dialogue. Ce qui doit être modifié est donc uniquement la partie entre guillemet. Et si on regarde de plus près le texte, on peut voir des choses étranges : \<K>\<P>, \<S\:I>, \<F\:S>… C’est ce qu’on va appeler les codes du jeu. Chaque jeu a les siens, et il faut comprendre ce qu’ils font pour pouvoir les utiliser lors de la traduction. Pour cet exemple, \<K> permet d’attendre un clic pour passer au dialogue suivant. \<P> efface le contenu de la boîte de dialogue. \<S\:I>texte\<S\:N> met un texte en italique. \<F\:S> écrit le texte en plus petit pour donner une impression de chuchotement.

Un dernier point notable avant de continuer sur la suite, parfois on peut aussi modifier la manière dont le jeu est programmé, donc on peut modifier le code même du jeu. Par exemple, la modification qui permet d’accélérer les déplacements dans les couloirs de VLR en maintenant un bouton.

![mode vitesse vlr](/articles-content/0002/vitesse_vlr.webp)

## Travailler en équipe de manière organisée

Une traduction de jeu, c’est rarement le travail d’une seule personne, et même dans le cas où une seule personne ferait tout, cela reste préférable d’avoir une bonne organisation. Pour cela, il y a deux grandes écoles : L’usage d’un Git, et l’usage d’un drive. Git est un outil servant pour la programmation. C’est ce qu’on appelle un outil de versionning. Cela veut dire que chaque changement est journalisé et il est possible à tout moment de revenir à n’importe quel état du projet. Cela permet aussi de créer un système de branche qui permet de facilement travailler à plusieurs sur un même fichier. Git peut avoir pleins d’autres usages, mais le point important, c’est cette sauvegarde des modifications. Et Git peut être couplé à un système conçu pour héberger en ligne des Git, comme GitHub. Ainsi, il est simple de travailler avec plusieurs personnes sur le projet. Le gros avantage de Git par rapport à la méthode suivante, c’est que nous travaillons sur des fichiers hors-ligne, donc tout le projet est directement sur notre PC, ce qui peut permettre d’utiliser des logiciels, et surtout chacun peut utiliser le logiciel de son choix pour éditer le texte. L’autre choix possible est l’utilisation de Google Drive et sa suite d’applications. C’est ce que nous préférons pour nos projets. L’idée est ici d’exporter les contenus à modifier du jeu dans des Google Sheets. Le but est de faire disparaitre la structure des fichiers, et de rendre la traduction pratique pour les traducteurs. Et surtout, c’est bien plus simple d’utilisation que Git où tout de suite l’usage peut perdre les traducteurs les moins programmeurs dans l’âme.

Prenons un exemple pour voir comment se structure un projet.

![table never7](/articles-content/0002/table_never7.webp)

C’est ce qu’on appelle la table du projet. On y retrouve une vue générale de l’avancement de la traduction. Chaque ligne correspond à un fichier, ou à un segment narratif si la découpe en fichiers du scénario n’est pas assez parlante. Pour chaque fichier, on indique son type. Ici on ne voit que le type scénario, mais plus bas on a du type système avec les messages des menus. Il y a ensuite une description pour savoir rapidement ce que contient le fichier. Ensuite, le status indique où en est le fichier (traduction, relecture, fini…). Et les dernières colonnes sont les statistiques des fichiers en terme d’avancement de la traduction. C’est sur cette table que nous avons en direct la progression du projet.

Sur les autres pages de la table, on va indiquer des infos globales pour la traduction. Il y aura une page pour la traduction des termes spécifiques au VN qu’on va retrouver dans tous les fichiers, ou encore une page pour la manière de parler des personnages avec le tutoiement/vouvoiement.

Maintenant, regardons comment se présente un fichier de traduction.

![exemple sheet vlr](/articles-content/0002/sheet_vlr.webp)

Les colonnes présentes dans un Google Sheets peuvent varier suivant les projets, mais la logique sera la même. On a donc dans cet exemple toutes les données importantes réparties dans des colonnes. La première colonne correspond à l’ID de la ligne. Ce n’est pas une information utile pour le traducteur, mais c’est ce qui va permettre de replacer la phrase dans le fichier du jeu. Ensuite, il y a le nom du personnage qui parle, plutôt pratique. Ça peut aussi permettre d’indiquer d’autres contextes comme "narration", "système", etc. À droite, on les 3 colonnes principales pour la traduction : la version anglaise, la version japonaise et la version française qui est à remplir. Ainsi, tous les projets sont dans le même format et dans un outil que tout le monde sait utiliser (Google Drive et Sheets). Et un autre avantage de Google Sheets, c’est la possibilité de mettre de la couleur, du gras, d’avoir la police qu’on veut… Tout cela n’aura pas d’impact pour la réinsertion dans le jeu, donc les traducteurs peuvent s’en servir pour travailler. Ils peuvent aussi utiliser toutes les autres colonnes pour mettre des commentaires. Et par-dessus tout ça, Google Sheets embarque un système de versionning par case. Il est donc simple de revenir à une ancienne valeur d’une case (et de savoir qui a fait des bêtises).

Si vous avez fait attention à la première ligne de la table de Never7, il y a une autre table, la table des images.

![table des images de ztd](/articles-content/0002/table_image_ztd.webp)

C’est dans table qu’on va définir quelle traduction il faut adopter pour les images comportant du texte. Pour créer cette table, il faut d’abord procéder à un tri des images. Il faut garder uniquement les images présentant du texte, ou celles sans texte qui devront être modifées à coup sûr. Ensuite, il faut trier les images histoire d’y voir plus clair. Parfois, elles sont déjà structurées par dossier (c’est le cas de l’exemple ici), mais si ce n’est pas le cas, il vaut le faire pour ensuite facilement retrouver les images parmi toutes les images. Quand ce tri est fait, on peut toutes les importer sur Google Drive dans un dossier pour les images originales, et créer un dossier avec la même structure de sous-dossiers pour y placer par la suite les images traduites. La table va reproduire cette organisation de dossiers.

![exemple page table des images de ztd](/articles-content/0002/page_table_image_ztd.webp)

Dans la case mauve, on retrouve le chemin de dossier où sont placées les images qui suivent. Pour chaque image, on aura le nombre d’images semblables. Dans certains jeux, l’optimisation c’est pas tout à fait cela, et on peut retrouver plusieurs fois la même image. Mais cette donnée va peut-être disparaitre, car c’est au final assez rare. La première table d’images était celle de 999 qui était un cas très particulier, Et VLR était tout aussi particulier. Ensuite, il y a le statut. L’image explique tout d’elle-même.

![statut d’une image pour une table d’image](/articles-content/0002/image_statut.webp)

L’éditeur, c’est la personne qui a fait la modification, et donc qui a le projet sur son logiciel de modification pour remodifier cette image si besoin. La colonne suivante est tout simplement comment doit être traduit le texte. Ce sont les traducteurs qui doivent remplir ce champ, et ensuite indiquer comme statut "Texte fixe" pour signaler que la modification peut être faite. Et enfin, la dernière colonne peut servir à donner le contexte de l’image quand c’est complexe de savoir où elle apparait, pour ensuite pouvoir tester l’image en jeu.

## Petit aparté sur la modification d’image

Pour modifier une image, il y a trois étapes. D’abord il faut nettoyer l’image. Cela revient à faire disparaitre proprement le texte de l’image. Ensuite, il faut écrire le nouveau texte. Le plus simple pour le texte n’est clairement pas d’essayer de dessiner les lettres dans le style de la police originale, mais plutôt de trouver une police qui correspond bien, et d’utiliser cette police. Souvent un jeu va avoir des polices communes entre plusieurs images. Une même police peut donc servir pour plusieurs images. Trouver une police peut parfois être long, et celles installées par défaut ne vont pas forcément coller et il faudra voir pour en trouver une adaptée sur internet. Une fois que la police est trouvée, et que le texte est écrit, il y aura un travail pour atteindre le style de l’image d’origine via du flou, de l’ombrage, la couleur, l’orientation 3D du texte… Et une fois que tout correspond, il ne reste plus qu’à enregistrer l’image.

Pour ce qui est du logiciel à utiliser, c’est à la préférence du graphiste, mais un choix courant est Photoshop. Personnellement, j’utilise Paint.Net pour nettoyer et enregistrer l’image et Inkscape pour créer le texte et son rendu. Un autre choix un peu classique peut être Gimp. Dans le cadre des images au format DDS, il faudra soit un logiciel pouvant enregistrer dans ce format (Paint.Net par exemple), soit des plugins si ce n’est pas supporté par défaut.

Si vous n’avez jamais fait d’édition d’images, il ne faut pas avoir peur d’essayer. Je n’avais aucune compétence avant, et j’ai fini par faire presque l’intégralité des modifications des images des 3 Zero Escape.

Et voici un petit aperçu du joyeux bazar des créations de textes sur Inkscape pour Zero Time Dilemma.

![inkscape ztd](/articles-content/0002/ztd_inkscape.webp)


## Tester en jeu à tout moment

Traduire dans des Google Sheets, modifier des PNG, c’est bien, mais est-ce qu’une fois dans le jeu, ça passe bien ?

Pour chaque projet, nous développons un petit logiciel qui permet à tout le monde à tout moment de patcher le jeu avec les données de l’instant T. Le but recherché est que les traducteurs ou les graphistes ne soient pas dépendants d’un programmeur pour tester en jeu leur traduction ou image. Ils n’ont qu’à lancer le logiciel, sélectionner ce qu’ils veulent patcher, et lancer le traitement. C’est pour ce genre de logiciel que je disais que nous préférons des outils en ligne de commande, car ils nous permettent de véritablement tout faire via ce simple bouton "patcher".

![Logiciel patch auto](/articles-content/0002/logiciel_patch_auto.webp)

Au fil des projets, nous avons une version template assez développée de ce logiciel pour rapidement en créer un pour un nouveau projet.

## La traduction est terminée ! Mais ce n’est pas fini

Pour proposer un patch de qualité, il faut passer par une phase de correction, de relecture et de test en jeu. Pour une première passe de correction, j’ai conçu un [logiciel](https://github.com/Silous888/RawTextCheck) spécialement fait pour repérer les fautes dans des fichiers structurés, ou dans des Google Sheets ou Excel. En plus de pouvoir faire de l’analyse de fautes et styles, il y a tout un système pour filtrer les codes présents dans les textes pour avoir des phrases analysables. Il y a aussi un système de dictionnaire et mots banni pour ajouter les termes lié au jeu traduit, et bannir les mots qui ne sont pas repérés comme fautes de français, mais qui ne sont pas acceptés dans les choix de traduction.

![rawtextcheck](/articles-content/0002/rawtextcheck.webp)

Cela permet de trouver une grande partie des fautes, mais c’est loin d’être fini. Côté équipe, on va relire la traduction directement en jeu. Pour certains projets, nous faisons des relectures en groupe avec un stream sur un vocal Discord en lisant à voix haute les phrases. C’est un bon moyen pour repérer des phrases qui ne fonctionnent pas, et le faire en groupe permet de pouvoir débattre sur quelle correction choisir. Mais cette manière de faire prend beaucoup de temps.

Le travail côté équipe est presque fini, mais c’est désormais le moment de l’arrivée des bêta-testeurs. Avant de sortir un patch, il vaut mieux le faire relire par un maximum de personnes et pour cela, on organise une phase de relecture publique pour avoir un maximum de personne pour repérer un maximum de fautes. Ça peut aussi être l’occasion pour les testeurs de questionner nos choix de traductions. Généralement, ces choix ne vont pas changer, mais il peut arriver qu’on se rende compte que certains choix pourraient être mieux.

## Plus qu’à sortir le patch

La dernière étape technique est de créer le patch qui sera proposé publiquement et de coder le patcheur pour patcher le jeu automatiquement. Le patcheur public et celui fait en interne pour l’équipe de traduction ne vont pas être les mêmes. La raison principale est que vu que les fichiers ne vont pas sans cesse changer, nous n’avons pas besoin de livrer les mêmes choses pour patcher le jeu. Par exemple, l’outil pour importer et exporter les données ne sera souvent pas transmis. Une autre raison est qu’il est préférable que le patch public ne dépende pas de ressources sur internet, donc qu’il ne récupère pas les données sur les Google Sheets. Cela peut éviter des problèmes.

Pour le format des fichiers du patch, il peut y avoir plusieurs cas. Soit le jeu est contenu sur un seul fichier. Ça va être le cas de certains jeux PC comme les Zero Escape, et ça va aussi être le cas des jeux consoles où il n’y a que la ROM. Nous n’allons pas directement donner le fichier du jeu modifié, parce que ça peut revenir à donner le jeu gratuitement. À la place, on va créer un fichier qui permet au fichier d’origine du jeu de devenir le fichier modifié contenant la traduction. C’est un fichier de différence que l’on transmet. On peut générer un tel fichier avec un outil nommé xDelta dont vous trouverez [ici une version avec UI](https://github.com/marco-calautti/DeltaPatcher). L’autre possibilité est de fournir uniquement les fichiers modifiés si ça ne revient pas à fournir tout le jeu. Et pour de très rare cas, on peut utiliser à nouveau l’outil d’insertion qui a servi à la traduction et l’utiliser pour insérer la traduction si c’est plus simple comme cela.

Toute la technique est faite, le patch peut sortir !

Nous avons vu toutes les étapes de comment faire un patch de traduction. Plus qu’à faire pleins de traductions de Visual Novel maintenant !