import { findStrInFile } from '.';

async function asyncForEach<T>(
  array: T[], callback: (value: T, index?: number, array?: T[]) => Promise<void>
): Promise<void> {
  let index: number;

  for (index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array)
  }
}

async function findStrInFiles(filePaths: string[], searchRegExp: RegExp): Promise<string[]> {
  const foundFiles: string[] = [];

  await asyncForEach(filePaths, async (filePath) => {
    const containsStr = await findStrInFile(filePath, searchRegExp);

    if (containsStr) {
      foundFiles.push(filePath);
    }
  });

  return foundFiles;
}

export {
  findStrInFiles
};
