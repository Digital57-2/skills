const fs = require('fs');
const path = require('path');

// Directorio raíz (donde se ejecuta el script)
const rootDir = __dirname;
const manifestPath = path.join(rootDir, 'skills-manifest.json');

// 🎯 LISTA BLANCA: Solo se escanearán estas carpetas desde la raíz
const allowedRootDirs = ['Performance', 'contenido', 'diseño', 'social_media'];

// Función recursiva para escanear directorios
function scanDirectory(dirPath, manifest = {}) {
    // Si la carpeta no existe (por si hay un error de tipeo en la lista), la saltamos
    if (!fs.existsSync(dirPath)) return manifest;

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Entrar recursivamente a las subcarpetas sin restricciones
            scanDirectory(fullPath, manifest);
        } else if (stat.isFile() && file.endsWith('.md')) {
            // Si es un archivo Markdown, obtener su nombre sin extensión
            const skillName = path.basename(file, '.md');
            
            // Crear la ruta relativa desde la raíz y cambiar barras invertidas a normales
            const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
            
            // Agregar al manifest
            manifest[skillName] = relativePath;
        }
    });

    return manifest;
}

const manifestData = {};

// Iniciar el escaneo SOLO en las carpetas permitidas
allowedRootDirs.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    scanDirectory(folderPath, manifestData);
});

// Escribir el resultado final en el archivo skills-manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');

console.log(`✅ ¡Éxito! Manifest actualizado. Se extrajeron ${Object.keys(manifestData).length} skills de las carpetas especificadas.`);
