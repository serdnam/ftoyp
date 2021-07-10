import { getCommandAndArgs } from "../helpers/commandAndArgs.ts";
import { UserCommand } from "./commands/USER.ts";
import { QuitCommand } from "./commands/QUIT.ts";
import { PwdCommand } from "./commands/PWD.ts";
import { PortCommand } from "./commands/PORT.ts";
import { TypeCommand } from "./commands/TYPE.ts";
import { SizeCommand } from "./commands/SIZE.ts";
import { RetrCommand } from "./commands/RETR.ts";

const encoder = new TextEncoder();
export default async function handler(conn: Deno.Conn, filesDirectory: string) {
  const state = {
    connection: "ACTIVE",
    type: "I",
    activeConnection: {
      address: "",
      port: "",
    },
    pwd: "/",
  };
  const data = new Uint8Array(256);
  await conn.write(encoder.encode("220 Service ready \r\n"));
  console.log(conn.remoteAddr, conn.localAddr);

  while (state.connection !== "DISCONNECT") {
    try {
      const bytesRead = await conn.read(data);
      const result = getCommandAndArgs(data, bytesRead);
      if (result) {
        const [commandName, args] = result;
        console.log("COMMAND ", commandName);
        switch (commandName) {
          case "USER":
            await UserCommand(conn, args);
            break;
          case "PWD":
            await PwdCommand(conn, state.pwd);
            break;
          case "PORT":
            [state.activeConnection.address, state.activeConnection.port] =
              await PortCommand(conn, args);
            console.log(state);
            break;
          case "TYPE":
            state.type = await TypeCommand(conn, args);
            break;
          case "SIZE":
            await SizeCommand(conn, args, filesDirectory, state.pwd);
            break;
          case "RETR":
            await RetrCommand(conn, args, filesDirectory, state);
            break;
          case "QUIT":
            await QuitCommand(conn);
            await conn.close();
            state.connection = "DISCONNECT";
            break;
        }
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e, e.message);
      await conn.write(encoder.encode("500 ERROR \r\n"));
      await conn.close();
      state.connection = "DISCONNECT";
    }
  }
}
