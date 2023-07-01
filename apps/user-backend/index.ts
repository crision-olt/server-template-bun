import { router } from "./config/router";
 
const server = Bun.serve({
	port: 3000,
	fetch: router.handleRequest
});

console.log(`Listening on http://localhost:${server.port}...`);