## nest:generate:controller

Creates a new controller

```bash
docker-compose exec -T backend /bin/sh -c 'nest generate controller '"$@"
```

## nest:generate:service

Creates a new service

```bash
docker-compose exec -T backend /bin/sh -c 'nest generate service '"$@"
```

## db:migration:generate

Create new migration from entity diff

```bash
docker-compose exec -T backend /bin/sh -c 'npm run typeorm:migration:generate '"$@"
```

## db:migration:run

Applies all migrations to db that have not been applied jet

```bash
docker-compose exec -T backend /bin/sh -c 'npm run typeorm:migration:run'
```

## db:migration:revert

Reverts the most recently executed migration

```bash
docker-compose exec -T backend /bin/sh -c 'npm run typeorm:migration:revert'
```