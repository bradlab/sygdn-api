# SyGDN-API

Gestion des dossiers dans les cabinets de notaire. Chaque dossier est créé dans un domaine ou sous-domaine spécifique. Pour chaque domaine/sous-domaine, il y a des étapes (avec une durée donnée) par lesquelles les dossiers passent avant la fin de leur traitement.

> API backend développée avec [NestJS](https://nestjs.com/) en TypeScript, suivant le principe de **Clean Architecture**.  
> Elle utilise PostgreSQL comme base de données, TypeORM pour la couche ORM, et Docker pour l’environnement de développement et de production.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge&logo=typeorm&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
  <img src="https://img.shields.io/badge/Winston-000000?style=for-the-badge&logo=npm&logoColor=white&label=Winston" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

---


## 🧱 Stack technique

- **Langage** : TypeScript
- **Framework** : [NestJS](https://nestjs.com/)
- **Base de données** : PostgreSQL
- **ORM** : TypeORM
- **Conteneurisation** : Docker + Docker Compose
- **Architecture** : Clean Architecture (domain > application > infrastructure > interface)

---

## 🚀 Fonctionnalités principales

- 🔧 Framework : [NestJS](https://nestjs.com/)
- 🔍 Documentation REST via Swagger
- 🔮 Interface GraphQL via Apollo Server
- 🐘 Base de données PostgreSQL
- 📝 Journalisation avec Winston
- 🧪 Prise en charge des tests (unitaires et E2E)
- 🧩 Architecture modulaire
- 🔐 Validation et sécurité intégrées

### Prérequis

- Node.js >= 22
- PostgreSQL
- npm, yarn ou pnpm

## 🚀 Démarrage rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/bradlab/sygdn-api.git
cd sygdn-api
```

### 2. Installer les dépendances

#### Avec npm :
```bash
npm install
```

#### Avec yarn :
```bash
yarn install
```

---

### 3. Configurer les variables d’environnement

Crée un fichier `.env` à la racine du projet en t’inspirant du fichier `.env.example` :

```env
# Exemple de configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=db_user
DATABASE_PASSWORD=user_password
DATABASE_NAME=db_name
PORT=3000
```

---

### 4. Lancer l’application en mode développement

#### Avec npm :
```bash
npm run start:dev
```

#### Avec yarn :
```bash
yarn start:dev
```

---

## 🐳 Utilisation avec Docker

### 1. Lancer l’environnement complet

```bash
docker-compose up --build
```

Cela démarre :
- L’API NestJS
- La base de données PostgreSQL

---

### 2. Arrêter les conteneurs

```bash
docker-compose down
```

---

## 📁 Structure du projet (Clean Architecture)


## 🛠️ Scripts utiles

| Commande                        | npm                       | yarn                     |
|---------------------------------|---------------------------|--------------------------|
| Démarrer l'app                  | `npm run start`           | `yarn start`             |
| Mode développement              | `npm run start:dev`       | `yarn start:dev`         |
| Compiler                        | `npm run build`           | `yarn build`             |
| Lint                            | `npm run lint`            | `yarn lint`              |
| Tests unitaires                 | `npm run test`            | `yarn test`              |
| Tests en mode watch             | `npm run test:watch`      | `yarn test:watch`        |
| Typescript check                | `npx tsc`                                            |

---

Swagger (REST)
Accessible via :
[http://localhost:3000/doc](http://localhost:3000/doc)

GraphQL Playground
Accessible via :
[http://localhost:3000/graphql](http://localhost:3000/graphql)

## 🧪 Tests

#### Avec npm :
```bash
npm run test
```

#### Avec yarn :
```bash
yarn test
```

---

## 🧾 Migrations TypeORM

#### Créer une migration :

```bash
npm run typeorm migration:create -- -n NomMigration
# ou
yarn typeorm migration:create -n NomMigration
```

#### Exécuter les migrations :

```bash
npm run typeorm migration:run
# ou
yarn typeorm migration:run
```

#### Revenir en arrière :

```bash
npm run typeorm migration:revert
# ou
yarn typeorm migration:revert
```

---

## 📫 Contact

Pour toute question ou contribution :

- Auteur : **bradlab**
- Email : `matbradiouf@example.com`
- GitHub : [https://github.com/bradlab](https://github.com/bradlab)

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus d’informations.
