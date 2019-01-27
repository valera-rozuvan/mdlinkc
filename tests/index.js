const { Mdlinkc } = require('../bin/main.js');

if (process.argv.length <= 2) {
  console.log('Usage: ' + __filename + ' path/to/directory');
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
