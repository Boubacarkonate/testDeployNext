# Application de gestion de tâches

## Description
Cette application est une solution web simple et efficace pour la gestion des tâches, conçue pour permettre aux utilisateurs de créer, modifier, afficher et supprimer des tâches. Chaque tâche peut être assignée à un utilisateur, et le design est optimisé grâce à **Next.js** et **Tailwind CSS**.

---

## Fonctionnalités
- **Gestion des tâches** :
  - Créez des tâches avec un nom.
  - Modifiez les tâches.
  - Supprimez des tâches.

---

## Technologies utilisées
- **Frontend** :
  - [Next.js](https://nextjs.org) pour l'interface et les fonctionnalités côté client.
  - [Tailwind CSS](https://tailwindcss.com) pour le style responsive.
- **Backend** :
  - [Prisma](https://www.prisma.io) comme ORM pour gérer la base de données MySQL.
- **Base de données** : MySQL.

---

## Prérequis
- Node.js (v16 ou supérieur).
- npm, yarn, pnpm, ou bun.
- Une instance MySQL ou PostgreSQL en cours d'exécution.

---

## Installation et configuration

1. Clonez le repository :
   ```bash
   git clone <URL_DU_REPOSITORY>
2. Accédez au répertoire du projet :
   ```bash
   cd application-gestion-taches
3. Installez les dépendances :
   ```bash
   npm install
4. Configurez la base de données : 
-créer un fichier .env dans le répertoire racine avec le contenu suivant et remplacez <username>, <password> et <database_name> par vos informations.:
   ```bash
   DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database_name>"
5. Appliquez les migrations Prisma :
   ```bash
   npx prisma migrate dev
6. Lancez le serveur de développement :
   ```bash
   npx prisma migrate
7. Lancez le serveur de développement :
   ```bash
   npm run dev

8. Accédez à l'application : Ouvrez votre navigateur et visitez http://localhost:3000.

--------------------------------------
Les endpoints API
```bash
GET  :  "/api/tasks"     pour récupérer la liste des tâches
POST :  "/api/tasks"     pour ajouter une nouvelle tâche
PUT  :  "/api/tasks/id"  pour modifier une tâche
POST :  "/api/tasks/id"  pour supprimer une tâche