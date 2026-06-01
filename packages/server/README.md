# server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
## Services

Docker is used with actual instances of services in order to test authentically. The `services` 
script will start the services in the background.

Example buckle and docker-compose files are provided in the `dev` directory. Duplicate these and
rename them to `buckle.yml` and `docker-compose.yml` respectively in order to use them for 
development.