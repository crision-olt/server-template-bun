import { router } from "./config/router";
 
const server = Bun.serve({
	port: 3000,
	fetch: (req) => router.handleRequest(req),
});

// eslint-disable-next-line no-console
console.log(`Listening on http://localhost:${server.port}...`);