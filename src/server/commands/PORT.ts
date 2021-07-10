const encoder = new TextEncoder();
export async function PortCommand(
  conn: Deno.Conn,
  args: string[],
): Promise<[string, string]> {
  const [h1, h2, h3, h4, p1, p2] = args[0].split(",");
  const address = `${h1}.${h2}.${h3}.${h4}`;
  // p1 are the 8 higher bits of the port number, shift left 8 bits and then add the lower 8 bits (p2)
  const port = ((parseInt(p1) << 8) + parseInt(p2)).toString();
  await conn.write(
    encoder.encode(`200 PORT command successful ${address}:${port} \r\n`),
  );
  return [address, port];
}
