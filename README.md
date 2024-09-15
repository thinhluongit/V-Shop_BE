# Project Title

shop-in-zalo-be

## Installation

Install shop-in-zalo-be with yarn

```bash
  cd shop-in-zalo-be
  yarn
  yarn clear-data
  yarn dev

```

Prisma commands

```bash

    Set up a new Prisma project
    $ prisma init

    Generate artifacts (e.g. Prisma Client)
    $ prisma generate

    Browse your data
    $ prisma studio

    Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
    $ prisma migrate dev

    Pull the schema from an existing database, updating the Prisma schema
    $ prisma db pull

    Push the Prisma schema state to the database
    $ prisma db push

    Validate your Prisma schema
    $ prisma validate

    Format your Prisma schema
    $ prisma format

    Display Prisma version info
    $ prisma version

    Display Prisma debug info
    $ prisma debug
```

## Tech Stack

**Server:** Node, Express

**Database:** Prisma ORM, PostgresSQL

## API Reference

#### Get all users

```http
  GET /api/users
```

#### Create a new user

```http
  POST /api/users
```

#### Get user by id

```http
  GET /api/users/:id
```

#### Get all products

```http
  GET /api/products
```

#### Create a new product

```http
  POST /api/products
```
