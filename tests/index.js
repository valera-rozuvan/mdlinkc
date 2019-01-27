const { Mdlinkc } = require('../bin/main.js');

if (process.argv.length <= 3) {
  console.log(`You need to pass 2 parameters.`);
  console.log(`Usage: ${__filename} 'path/to/directory' 'Section Name'`);

  process.exit(-1);

  return;
}

const srcDir = process.argv[2];
const section = process.argv[3];
const mdlinkc = new Mdlinkc(srcDir);

mdlinkc.getLinks(section).then((links) => {
  links.forEach((link, idx) => {
    console.log(`link ${idx}: ${link}`);
  });
});
