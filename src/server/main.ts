import { onSignal } from "https://deno.land/std/signal/mod.ts";
import * as path from "https://deno.land/std@0.100.0/path/mod.ts";
import handler from "./handler.ts";

const server = await Deno.listen({
  port: 21,
  transport: "tcp",
});

const filesDirectory = path.resolve(path.join(".", Deno.args[0]));

console.log(filesDirectory);

const handle = onSignal(Deno.Signal.SIGINT, () => {
  console.log("Shutting down.");
  server.close();
  handle.dispose();
  Deno.exit(0);
});

for await (const conn of server) {
  try {
    handler(conn, filesDirectory);
  } catch (err) {
    throw err;
  }
}
