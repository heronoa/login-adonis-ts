# AdonisJS User CRUD with TypeScript

This is a simple User CRUD (Create, Read, Update, Delete) application built using AdonisJS with TypeScript.

## Prerequisites
- Node.js (v14 or higher)
- NPM (v6 or higher)
- Adonis CLI (v4 or higher)
- mySQL (v8 or higher)

## Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/adonisjs-user-crud-typescript.git`
```

2. Install dependencies

```bash
cd adonisjs-user-crud-typescript
npm install
```
3. Create a .env file in the root directory and add the following (You can find it in the .env.example):

```bash
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=X1esD2ZdWCUfBmjt4oLrb18AUEWGCYlu
DRIVE_DISK=local
DB_CONNECTION=pg
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=lucid
MYSQL_PASSWORD=
MYSQL_DB_NAME=lucid
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USERNAME=<username>
SMTP_PASSWORD=<password>
CACHE_VIEWS=false
```

Create a .env file in the root directory and add the following:
makefile

4. Run migrations
```bash
adonis migration:run
```
5. Start the application
```bash
npm run start
```

# Usage

You can access the API through the following endpoints:

- `GET /me` - Show the logged user, need to send a Authorization token in the header
- `POST /sigin` - Create a new user
- `POST /login` - Receive a json with the email and password to make login
- `POST /logout` - Delete a user token from the database dislogging a user
- `GET /confirm?token=${user.confirmation_token}` - Update the user.is_confirm to true with the right token is sended
- `GET /resend` - resend the confirmation email sended in the singin to the user
- `DELETE /delete` - Delete a user by token

# Contributing

If you find any issues or have a feature request, please feel free to open an issue or submit a pull request.

# License

This project is licensed under the MIT License - see the LICENSE file for details.
