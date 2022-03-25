# Vending machine playground mini

## Features
- Login with exist user (Not full authen flow)
	- JWT access token support
	- username: test1
	- password: 123456
	- // you can check from table user in DB or in seed file
- List products with product detail
- Order transaction with each status
	- validated request
	- There is enum for status
	- Log transaction of ordering


## Requirement tool/lib
- nodejs v16
- typescript
- git
- docker
- postgresql
- npx

## Installation
```
yarn install
docker compose up -d
npx prisma migrate dev
npx prisma db seed
```
- `docker compose up -d` will create postgresql at local port 5432
- `npx prisma mgirate dev` will migrate database
- `npx prisma db seed` will seed database with
	- User detail
	- Product detail: price, amount, name, image
	- Order transaction: transaction of user ordering

## Run dev
```
yarn dev
```
Server will run on `localhost:3001`

## Run production
```
yarn serve
```


---
## Note
I remove .env from gitignore for easier to setup