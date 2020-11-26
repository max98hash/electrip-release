# Projet Web 2020 : Electrip

## Présentation

Electrip à pour objectif de pouvoir organiser des trajets ou des vacances en voiture électrique.

Quelques fonctionnalités :

- Calcul d'arrêt en station de charge en fonction de l'autonomie
- Recherche d'activités (restaurants, évènements, visites, etc...)
- Sauvegarde des trajets et activités dans un calendrier
- Visualisation des trajets et activités sur une carte

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

### En local

```shell
cd client/
npm install
npm run serve
```

```shell
cd server/
npm install
npm run serve
```

Puis accès à l'application sur l'adresse :

```http
http://localhost:8080
```
