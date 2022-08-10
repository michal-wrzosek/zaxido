export async function wait(howLongMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), howLongMs);
  });
}
