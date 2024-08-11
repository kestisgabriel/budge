Bun.serve({
	fetch(req) {
		return new Response("404!");
	},
});

console.log("Hello via Bun!");
