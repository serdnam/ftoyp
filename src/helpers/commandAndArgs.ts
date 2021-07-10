const decoder = new TextDecoder();

export function getCommandAndArgs(
  command: Uint8Array,
  bytesRead: number | null,
): [string, string[]] | null {
  if (bytesRead !== null) {
    const data = command.subarray(0, bytesRead);
    const commandText = decoder.decode(
      data,
    ).split("\r\n")[0];
    const [commandName, ...args] = commandText.split(" ");
    console.log(commandName, args);
    return [commandName.toUpperCase(), args];
  }
  return null;
}
