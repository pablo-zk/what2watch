# What2Watch

Proyecto **'What2Watch'** -> Desarrollo de interfaces - web curso 2021/2022

## Introducción

El proyecto es una **aplicación** con la que puedes encontrar información de todas las **películas y series** en las que estes pensando, y crear **listas** personalizadas para guardar y mantener tu contenido favorito, o no, bien organizado.

Está información se recoge gracias a la [**API** de **TMBD**](https://www.themoviedb.org/?language=es)

## APP

La página consta de **4 partes**:

- Home
- *En proceso*
- Buscador filtrando por películas o series
- Gestión de tus listas

## Desarrollo

La parte del **Backend** está desarrollada en **Symfony** y la parte de **Frontend** en **Angular Ionic**.

Se trata de una aplicación diseñada principalmente para móviles aunque es posible su visualización en cualquier tamaño de pantalla.

## Setup

Para iniciar el proyecto, debes hacer lo siguiente:
Dentro del Frontend para iniciar el proyecto Ionic, intalalo mediante npm:

```
$ cd Fronten/ionic-w2w
$ npm install
```

Dentro del Backend para iniciar el proyecto Symfony, intalalo mediante composer:

```
$ cd Backend/sym-w2w
$ symfony composer install
```

Para crear la base de datos y generar la estrucutra de tablas, ejecuta los siguientes comandos:

```
$ php bin\console doctrine:database:create
$ php bin\console doctrine:migrations:migrate
```

> Creada y diseñada por **©Gorka Erdozáin, ©Asier Elorza y ©Pablo Zúñiga**
