export function panic(message: any): never {
  console.error(message);

  if ("exit" in process) {
    process.exit(1);
  }

  throw new Error(message);
}
