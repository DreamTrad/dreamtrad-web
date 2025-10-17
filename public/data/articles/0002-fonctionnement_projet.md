Vu de l’extérieur, la création d’un patch pour un jeu peut être vu comme simple puisque ce n’est que remplacer un texte par un autre. Ou au contraire, ça peut être vu comme quelque chose de totalement mystique parce qu’en regardant les fichiers du jeu, c’est juste illisible quand on ouvre les fichiers avec un éditeur de texte. Ou peut-être même que vous ne vous êtes jamais posé la question, mais dans tous les cas, on va tout expliquer ici, de la toute première étape qui consiste à trouver comment accéder aux fichiers du jeu, jusqu’à la dernière étape, quand le patch est terminé et il peut sortir.

## Au commencement, le jeu et ces fichiers

La première étape consiste donc à trouver un moyen d’extraire les fichiers du jeu, que ça soit le texte, ou même les images, textures, vidéos… À part dans de rares cas, ça ne sera pas directement accessible. Pour cela il avoir des outils ; outils qui sont soit à développer nous même, soit à trouver. Actuellement dans l’équipe, nous ne sommes pas assez compétent pour développer nous mêmes ces outils, donc nous devons en trouver.

Donc nous voulons un outil, mais où le chercher, et que cherchons-nous. On peut trouver des outil dédié à un jeu seulement. C’est souvent optimal car l’outil va être conçu pour gérer les spécificités du jeu. Mais s’il n’y a pas d’outil spécifique au jeu, on peut alors chercher un outil spécifique au moteur du jeu. Pour faire un jeu vidéo, le plus simple est créer un outil, un moteur, qui va servir pour facilement designer le jeu avec son level design. Dans le cadre d’un Visual Novel, on va faire en sorte que ce moteur ait déjà toute la partie qui gère l’affichage du texte, le placement des personnages, ou la lecture de la musique soit entièrement déjà implémenter, et ce qui permet de seulement donner le fichier texte pour avoir le texte qui s’affiche, de dire une position et un sprite pour que le personnage s’affiche, ou renseigner un fichier sonore pour qu’il soit jouer. Le Visual Novel étant un type de jeu vidéo très codifié, il est facile de faire un moteur réutilisable par d’autres projets. De ce fait, il existe énormément de moteurs différents. Et si vous avez bien compris le concept d’un moteur, si deux jeux sont fait avec le même moteur, cela veut dire qu’ils procèdent de la même manière pour afficher du texte. Si nous revenons à notre outil pour décortiquer un jeu, il devient logique qu’un outil spécifique à un moteur puisse être pertinent. Malgré tout, chaque jeu aura toujours quelques spécificités que l’outil généraliste pour le moteur ne prendra pas forcément en compte. Il y a donc des outils spécifique à un jeu, spécifique à un moteur, et il y a une dernière catégorie qui sont les outils spécifiques à une console. Pour récupérer les fichier d’un jeu DS, PSVita, NES, etc, des outils spécifiques à la console vont être utilisés pour extraire les données. Ils pourront suivant les cas être couplé à des outils pour le moteur ou pour le jeu.

Maintenant qu’on a bien identifié les types d’outils, comment les trouver ? La première solution est tout simplement de taper sur internet "nom du jeu" + "tool" ou des variantes du genre. Dans le cadre des Visual Novel, il y a un site qui bien utile dans bien des cas, et il s’agit de VNDB, la base de données des Visual Novel. Sur la page d’un Visual Novel, on va trouver toutes les fantraductions réalisées. On peut voir ici l’exemple de la page de [Clannad](https://vndb.org/v4).

La liste des fantraductions de Clannad.
![les fantraductions de clannad](/assets/articles-content/0002/vndb_clannad_releases.webp)
La liste des équipes ayant réalisés les fantraductions de Clannad.
![les équipes de fantraduction de clannad](/assets/articles-content/0002/vndb_clannad_team.webp)

Donc, quand un Visual Novel est déjà fantraduit dans une langue, il peut être intéressant d’aller voir sur les sites des équipes si leurs outils ne sont pas à disposition, ou directement en les contactant.

Sur VNDB, on peut trouver une autre information : le moteur du jeu. En allant sur la release que vous souhaitez traduire, le moteur du jeu est souvent renseigné. On peut voir que pour Clannad, c’est le moteur RealLive qui est utilisé pour la version Steam.

![Le moteur de clannad indiqué pour la version steam](/assets/articles-content/0002/vndb_clannad_one_release.webp)

Et il y a même une page du moteur pour voir tous les autres Visual Novel fait avec ce moteur. Cela peut soit permettre d’aller voir des outils pour ces jeux, car un outil fait pour AIR fonctionnera peut-être Clannad, et aussi, ça permet de faire un peu de repérage pour de futurs projets qui ne demanderait pas trop d’investissements pour les mettre en place si on déjà un outil spécifique à un moteur…

![VN populaire avec le moteur RealLive](/assets/articles-content/0002/vndb_reallive_vn.webp)

## On a un outil, et comment ça marche

Il y a deux types d’outils : ceux avec une interface graphique et ceux en ligne de commande. Les premiers rassurent tandis que les seconds font peur. Et pourtant, c’est bien ceux en ligne de commande qui sont préférable. Les outils à interface graphique ont le mérite d’être utilisable plus ou moins par tout le monde (suivant la qualité de l’UX). Mais le problème, c’est qu’on est dépendant cette interface, il faut tout faire à la main pour extraire et surtout pour réinsérer les données modifiées. Et c’est là que viennent les outils en ligne de commande, donc ceux qui s’exécute dans le terrifiant terminal. Leur avantage, c’est qu’on peut les intégrer à d’autres outils. Et c’est ce que nous faisons dans nos projets, nous reviendrons sur cela plus tard.

Bon, nous avons extrait les données du jeu avec notre outil. Il faut désormais étudier ce que nous avons extrait pour essayer de comprendre la structure du jeu, l’organisation des fichiers, les fichiers qui vont devoir être modifiés… Commençons par le plus simple : les images. La plupart du temps, elles seront déjà dans un format exploitable par des éditeurs d’image. Il peut arriver que les images soient dans des formats particulier comme le format DDS. Tous les logiciel d’images ne les ouvrent pas ce qui peut déjà être un problème. Et c’est surtout une fois avoir modifié l’image qu’il faut faire attention car il faut choisir le bon format de compression de l’image DDS.

![format dds](/assets/articles-content/0002/dds.webp)

Avant de se pencher au cœur du sujet dans le cas des VN, il y a certain type de données dont on ne pense pas forcément, et pourtant c’est presque tout le temps une donnée à modifier : La police du jeu.

![une police d’un jeu](/assets/articles-content/0002/font.webp)

Comme vous pouvez le voir sur cette image, la version anglaise n’a pas pensé à nous les français, avec nos é, î, à ou encore pire le œ. Donc, si nous voulons que nos beaux caractères français apparaissent en jeu, il va falloir modifier la police. La manière dont se modifie une police dépend de la manière dont elle est implémentée. La plupart du temps, la police sera une image sur laquelle il faudra ajouter nos caractères, et ensuite dans un autre fichier on va retrouver la logique qui permet de dire quel caractère est placé où sur l’image. Ça peut être long comme tâche, et parfois il y a plusieurs polices dans le jeu, et il faut donc faire cet exercice pour chaque police. Il peut y avoir d’autres complications avec les polices, mais restons simple pour cet article.

Maintenant, interessons nous au texte. Pour chaque jeu, ça sera différent, mais le concept restera le même, donc prenons un exemple.

![exemple texte VLR](/assets/articles-content/0002/text_vlr.webp)

Ici nous pouvons déjà voir que le texte est structuré. La structure sera différente pour chaque jeu. Pour ce cas, on a un ID avec dans l’accolade de l’ID le nom du personnage et le texte du dialogue. Ce qui doit être modifié est donc uniquement la partie entre guillemet. Et si on regarde de plus près le texte, on peut voir des choses étranges : \<K>\<P>, \<S\:I>, \<F\:S>… C’est ce qu’on va appeler les codes du jeu. Chaque jeu a les siens, et il faut comprendre ce qu’ils font pour pouvoir les utiliser lors de la traduction. Pour cet exemple, \<K> permet d’attendre un clic pour passer au dialogue suivant. \<P> efface le contenu de la boîte de dialogue. \<S\:I>texte\<S\:N> met un texte en italique. \<F\:S> écrit le texte en plus petit pour donner une impression de chuchottement.

Un dernier point notable avant de continuer sur la suite, parfois on peut aussi modifier la manière dont le jeu est programmé, donc on peut modifier le code même du jeu. Par exemple, la modification qui permet d’accélérer les déplacement pour les déplacements dans les couloirs de VLR en maintenant un bouton.

![mode vitesse vlr](/assets/articles-content/0002/vitesse_vlr.webp)

## Travailler en équipe de manière organisée

