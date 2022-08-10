import path = require('path');
import fs = require('fs');
import { NODE_ENV, TEMP_DIR_PATH } from '../configuration';

export async function memo<T>(
  key: string,
  fallback: () => Promise<T>
): Promise<T> {
  if (NODE_ENV !== 'development') return fallback();

  const filePath = path.join(TEMP_DIR_PATH, `temp_${key}.json`);

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent) as T;
    return data;
  } catch (_) {
    console.log(`miss: ${key}`);
    const data = await fallback();
    const fileContent = JSON.stringify(data);
    await fs.promises.writeFile(filePath, fileContent, 'utf-8');
    return data;
  }
}
