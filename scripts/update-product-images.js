const fs = require('fs');

let code = fs.readFileSync('data/products.ts', 'utf8');

const replacements = [
  ["image: '/assets/products/potassium-iodide.png'", "image: '/assets/products/potassium-iodide.jpg'"],
  ["image: '/assets/products/petroleum-jelly.png'", "image: '/assets/products/petroleum-jelly.jpg'"],
  ["image: '/assets/products/light-liquid-paraffin.png'", "image: '/assets/products/light-liquid-paraffin.jpg'"],
  ["image: '/assets/products/heavy-liquid-paraffin.png'", "image: '/assets/products/heavy-liquid-paraffin.jpg'"],
  ["image: '/assets/products/glycerin-dropper.png'", "image: '/assets/products/glycerin-dropper.jpg'"],
  ["image: '/assets/products/iodine-bottle.png'", "image: '/assets/products/iodine-bottle.jpg'"],
  ["image: '/assets/products/povidone-iodine.png'", "image: '/assets/products/povidone-iodine.jpg'"],
  ["image: '/assets/products/potassium-iodate.png'", "image: '/assets/products/potassium-iodide.jpg'"],
  ["image: '/assets/products/copper-sulphate.png'", "image: '/assets/products/copper-sulphate.jpg'"],
  ["image: '/assets/products/castor-oil.png'", "image: '/assets/products/castor-oil.jpg'"],
  ["image: '/assets/products/talcum-powder.png'", "image: '/assets/products/talcum-powder.jpg'"],
  ["image: '/assets/products/zinc-sulphate.png'", "image: '/assets/products/zinc-sulphate.jpg'"],
  ["image: '/assets/products/turpentine-oil.png'", "image: '/assets/products/turpentine-oil.jpg'"],
  ["image: '/assets/products/linseed-oil.png'", "image: '/assets/products/linseed-oil.jpg'"],
  ["image: '/assets/products/zinc-oxide-ip.png'", "image: '/assets/products/zinc-oxide-bag.png'"],
  ["image: '/assets/products/zinc-oxide-tech.png'", "image: '/assets/products/zinc-oxide-bag.png'"],
];

replacements.forEach(([from, to]) => {
  if (code.includes(from)) {
    code = code.replace(from, to);
    console.log('✓ Replaced:', from, '->', to);
  } else {
    console.warn('NOT FOUND:', from);
  }
});

// Also add images to products 36-39 if missing
if (!code.includes("image: '/assets/products/bleaching-powder.png'")) {
  code = code.replace(
    "slug: 'bleaching-powder',\n    name: 'Bleaching Powder',",
    "slug: 'bleaching-powder',\n    name: 'Bleaching Powder',\n    image: '/assets/products/bleaching-powder.png',"
  );
  console.log('✓ Added image for bleaching-powder');
}

if (!code.includes("image: '/assets/products/caustic-soda.png'")) {
  code = code.replace(
    "slug: 'caustic-soda',\n    name: 'Caustic Soda',",
    "slug: 'caustic-soda',\n    name: 'Caustic Soda',\n    image: '/assets/products/caustic-soda.png',"
  );
  console.log('✓ Added image for caustic-soda');
}

if (!code.includes("image: '/assets/products/sodium-bicarbonate.png'")) {
  code = code.replace(
    "slug: 'sodium-bicarbonate',\n    name: 'Sodium Bicarbonate',",
    "slug: 'sodium-bicarbonate',\n    name: 'Sodium Bicarbonate',\n    image: '/assets/products/sodium-bicarbonate.png',"
  );
  console.log('✓ Added image for sodium-bicarbonate');
}

if (!code.includes("image: '/assets/products/soda-ash.png'")) {
  code = code.replace(
    "slug: 'soda-ash',\n    name: 'Soda Ash',",
    "slug: 'soda-ash',\n    name: 'Soda Ash',\n    image: '/assets/products/soda-ash.png',"
  );
  console.log('✓ Added image for soda-ash');
}

fs.writeFileSync('data/products.ts', code, 'utf8');
console.log('All product image references updated successfully!');

