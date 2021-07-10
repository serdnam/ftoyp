import * as path from "https://deno.land/std@0.100.0/path/mod.ts";
const encoder = new TextEncoder();
export async function RetrCommand(
  conn: Deno.Conn,
  args: string[],
  fileDirectory: string,
  state: { pwd: string; activeConnection: { address: string; port: string } },
) {
  const fileName = args[0];
  const filePath = path.join(fileDirectory, state.pwd, fileName);
  const fileInfo = await Deno.lstat(filePath);
  // There is currently no way to set the local port in Deno, this should
  // use port 20 as a local port
  const activeConn = await Deno.connect({
    hostname: state.activeConnection.address,
    port: +state.activeConnection.port,
  });
  await conn.write(
    encoder.encode(
      `150-Connecting to port ${state.activeConnection.port} \n150 ${fileInfo.size} bytes to download \r\n`,
    ),
  );

  console.log(activeConn.localAddr);
  const file = await Deno.open(filePath);
  await Deno.copy(file, activeConn);
  await activeConn.close();
  await file.close();
  await conn.write(
    encoder.encode(
      `226 File successfully transfered \r\n`,
    ),
  );
}
