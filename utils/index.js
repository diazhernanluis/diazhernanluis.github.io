// resize-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = '../../imagenes/Sillita_mimbre';
const outputDir = '../img/Sillita_mimbre';
const scalePercent = 30; // Reducción del 50%

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const newWidth = Math.round(metadata.width * (scalePercent / 100));
    const newHeight = Math.round(metadata.height * (scalePercent / 100));

    await image
      .rotate()
      .resize(newWidth, newHeight)
      .jpeg({ quality: 70 }) // calidad de compresión (ajustable)
      .toFile(outputPath);

    console.log(`✅ Procesada: ${file}`);
  } catch (err) {
    console.error(`❌ Error con ${file}:`, err);
  }
});
