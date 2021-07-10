const encoder = new TextEncoder();
export async function UserCommand(conn: Deno.Conn, _args: string[]) {
  await conn.write(encoder.encode("230 User logged in, proceed \r\n"));
}
