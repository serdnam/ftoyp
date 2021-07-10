const encoder = new TextEncoder();
export async function PwdCommand(
  conn: Deno.Conn,
  pwd: string,
) {
  await conn.write(encoder.encode(`257 "${pwd}" \r\n`));
}
