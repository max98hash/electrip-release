# Projet Web 2020/2021 : Electrip

## Présentation

Electrip à pour objectif de pouvoir organiser son emploi du temps incluant des trajets en voiture électrique.

Quelques fonctionnalités :

- Calcul d'arrêt en station de charge en fonction de l'autonomie
- Sauvegarde et affichage des trajets et évènements dans un calendrier
- Visualisation des trajets et des stations de charge associées sur une carte

## Installation

### Via Docker

Une fois **Docker** installé sur votre machine, allez à la racine du projet puis :

```shell
sh start-docker.sh
```

ou

```shell
docker-compose up --build --force-recreate
```

Puis accès à l'application sur l'adresse :

```http
http://localhost:8080
```

Pour stopper l'application :

```shell
sh stop-docker.sh
````
