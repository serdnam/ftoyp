import * as path from "https://deno.land/std@0.100.0/path/mod.ts";
const encoder = new TextEncoder();
export async function SizeCommand(
  conn: Deno.Conn,
  args: string[],
  fileDirectory: string,
  pwd: string,
) {
  const fileName = args[0];
  const filePath = path.join(fileDirectory, pwd, fileName);
  const fileInfo = await Deno.lstat(filePath);
  await conn.write(
    encoder.encode(`213 ${fileInfo.size}\r\n`),
  );
}
