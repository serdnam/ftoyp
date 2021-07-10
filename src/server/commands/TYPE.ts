const encoder = new TextEncoder();
export async function TypeCommand(conn: Deno.Conn, args: string[]) {
  const type = args[0];
  if (type !== "I") throw new Error("UNSUPPORTED");
  await conn.write(
    encoder.encode(`200 Type is now Image \r\n`),
  );
  return type;
}
