>Ce repository fait partie d'un projet plus vaste dont le but est de créer un peripherique autonome proposant un questionnaire auquel on peut répondre à l'aide de 2 gros boutons.

#Quizz-web-app

Il s'agit site internet permettant d'afficher des questions avec 2 propositions de réponses a la suite.

Le but n'est pas de répondre directement depuis le site mais depuis un autre péripherique (voir [quizz-gpio-app](https://github.com/ideesdumidi/quizz-gpio-app)).

Il a été pensé pour être affiché sur un raspberry V1, et se veut le plus light possible.

###Partie Front-End
Cette partie permet d'afficher une question, et va attendre que cette dernière soit répondue avant de récupérer la suivante.

###Partie Back-End
Celle-ci s'occupe de renvoyer les questions, de récupérer, stocker et envoyer les réponses selectionnées.

## Côté Technique

 - Le serveur utilisé utilisé est node (V4)
 - Le dialogue entre le back-end et les front-end se fait à l'aide de socket-io
 - Les données sont stockés dans une base mongoDB, et le dialogue entre le serveur et la BDD se fait à l'aide de Mongoose.

##DONE
- Dialogue entre le client et le serveur
- selection et envoi d'une question pour un utilisateur
- sauvegarde et envoi de la réponse selectionnée

##TODO
- envoi des réponses de plusieurs serveurs dans un serveur commun
- simplification de la sélection de l'utilisateur courant (pour la centralisation des réponses)
