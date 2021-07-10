const encoder = new TextEncoder();
export async function QuitCommand(conn: Deno.Conn) {
  await conn.write(encoder.encode("221 Goodbye \r\n"));
}
