# Authentication Service

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

Simple API to handle user authentication

## Built with:
- Node.js
- Typescript
- Express.js
- TypeORM

## Database Diagram:
![](./docs/db_diagram.png)
## Endpoints:
- POST   ----  /auth/signUp
- POST   ----  /auth/signIn
- GET    ----  /auth/refresh
- GET    ----  /auth/verify
- GET    ----  /user/
- PUT    ----  /user/
- DELETE ----  /user/
- POST   ----  /user/role
- DELETE ----  /user/role
- GET    ----  /role/
- POST   ----  /role/
- DELETE ----  /role/:id
- GET    ----  /role/:id