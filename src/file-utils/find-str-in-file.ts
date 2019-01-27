import * as fs from 'fs';
import * as readline from 'readline';

async function findStrInFile(filePath: string, searchRegExp: RegExp): Promise<boolean> {
  return await new Promise<boolean>((resolve) => {
    let foundMatch = false;
    const instream = fs.createReadStream(filePath);

    instream.on('ready', () => {
      const rl = readline.createInterface({
        input: instream,
        terminal: false
      });

      rl.on('line', (line) => {
        if (foundMatch) {
          return;
        }

        if (searchRegExp.test(line)) {
          foundMatch = true;

          instream.destroy();
          rl.close();
        }
      })
      .on('close', () => {
        if (!foundMatch) {
          instream.destroy();
        }

        resolve(foundMatch);
      });
    })
    .on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.log(`ERROR: File not found! filePath = '${filePath}'.`);
      } else if (err.code === 'EACCES') {
        console.log(`ERROR: Permission denied! filePath = '${filePath}'.`);
      } else {
        console.log(`ERROR: filePath = '${filePath}'.`);
        console.log(err);
      }

      instream.destroy();
      resolve(foundMatch);
    });
  });
}

export {
  findStrInFile
};
