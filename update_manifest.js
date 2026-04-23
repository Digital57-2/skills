const fs = require('fs');
const path = require('path');

// Directorio raíz (donde se ejecuta el script)
const rootDir = __dirname;
const manifestPath = path.join(rootDir, 'skills-manifest.json');

// Carpetas que no queremos escanear
const ignoreDirs = ['.git', 'node_modules', '.github'];

function buildManifest(dirPath, manifest = {}) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!ignoreDirs.includes(file)) {
                // Si es un directorio y no está en la lista de ignorados, entrar a escanearlo
                buildManifest(fullPath, manifest);
            }
        } else if (stat.isFile() && file.endsWith('.md')) {
            // Si es un archivo Markdown, obtener su nombre sin extensión
            const skillName = path.basename(file, '.md');
            
            // Crear la ruta relativa desde la raíz y cambiar barras invertidas (Windows) a barras normales
            const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
            
            // Agregar al manifest
            manifest[skillName] = relativePath;
        }
    });

    return manifest;
}

// Ejecutar la función
const manifestData = buildManifest(rootDir);

// Escribir el resultado en el archivo skills-manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');

console.log(`✅ ¡Éxito! Manifest actualizado con ${Object.keys(manifestData).length} skills.`);
