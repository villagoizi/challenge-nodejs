# GraphQL API de Recetas
#### Pre-requisitos
Antes de utilizar la API necesita tener instalado:
- [NodeJS] (https://nodejs.org/es/)
- [PostgreSQL] (https://www.postgresql.org/download/)


## Funcionalidades
* El usuario debe iniciar sesion o registrarse para listar todas las recetas y categorias
* Autenticacion basado en tokens utilizando [JWT] (https://jwt.io/)
* El usuario podra filtrar las recetas por categoria, ingredientes o nombre de receta
* El usuario podra filtrar las categorias por su nombre
* El usuario podra listar, crear, modificar o eliminar una categoria
* El usuario podra listar, modificar o eliminar sus propias recetas


## Herramientas y Tecnologias
- NodeJS
- Express
- Apollo Server
- GraphQL
- PostgreSQL
- Typescript
- TypeORM
- JWT

## Iniciar Localmente
Debe tener instalado previamente Nodejs y PostgreSQL o un servicio de PostgreSQL con Docker
- Clonar el repositorio:
```
$ git clone https://github.com/villagoizi/challenge-nodejs.git
$ cd .\challenge-nodejs\
$ npm install
```

Antes de inicar deberá crear una base de datos con el nombre `challenge` o modificar el `ormconfig.json` con una base de datos que ud. haya creado.

#### ormconfig.json
```
{
    "name": "default",
    "type": "postgres", // o mysql si utiliza MySQL, instalar el driver
    "host": "localhost",
    "port": 5432,
    "username": "postgres", // nombre de usuario de su base de datos
    "password": "postgres", // contraseña de su base de datos
    "database": "challenge", // nombre de base de datos a crear o modifique por una que ud desea crear
    "entities": ["src/entity/*.{ts,js}"],
    "logging ": ["query", "error", "schema"],
    "synchronize": true,
    "migrationsTableName": "recipes_migration_table",
    "migrations": [
        "src/migration/**/*.{ts,js}"
        ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
       
 }
```
#### PostgreSQL como servicio con Docker
Si tiene instalado docker y desea utilizar el hub image de [PostgreSQL]: (https://hub.docker.com/_/postgres)

- Inicie su Docker Desktop
- Ejecutar: 
`docker pull postgres`
- Luego:
`docker run -d -p 5432:5432 --name recipe-challenge -e POSTGRES_PASSWORD=postgres postgres`
- Por ultimo*: 
`docker exec -it recipe-challenge psql -U postgres`
Esto abrira una terminal interactiva de PostgreSQL y ejecute:
`CREATE DATABASE challenge`

> Si tuvo algún problema con la creacion de la base de datos intente cambiar el comando `*` por `docker exec -it recipe-challenge bash`. Dentro del bash ejecute `createdb challenge`. Si pide un password agregue `-W postgres`.

Una vez todo esto configurado ejecute:
`npm run start:dev`

Iniciara la GraphQL API en el `http://localhost:5000/api`

## Generar el Build
Antes de generar el build cambiar configuracion del `ormconfig.json`:

```
{
    // others configurations
       "entities": ["dist/entity/*.{ts,js}"],
}
```

Y por último ejecutar:
`npm start`
Generara la carpeta `dist` con el respectivo codigo compilado Javascript y luego ejecutara la aplicacion GraphQL en js.