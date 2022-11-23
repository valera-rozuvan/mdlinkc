const prependFile = require('prepend-file');

prependFile('./bin/main.js', '#!/usr/bin/env node\n\n', (err) => {
    if (err) {
      console.error('Could not add a shebang to "./bin/main.js" file!');
      console.error('It will not be possible to run the file without "node" invocation!');
      console.error('------------------------');
      console.log(err);
    }
});
