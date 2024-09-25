import { convertMarkdownToJSON } from './convert-markdown-to-json.js';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funktion, die alle .md-Dateien in einem Verzeichnis durchgeht und in JSON konvertiert
function processMarkdownFiles(inputDir: string, outputDir: string) {
    // Verzeichnis erstellen, falls nicht vorhanden
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Alle Dateien im Eingabeverzeichnis auslesen
    const files = fs.readdirSync(inputDir);

    // Nur .md-Dateien verarbeiten
    files.forEach((file) => {
        const filePath = path.join(inputDir, file);

        if (path.extname(file) === '.md') {
            // Dateiinhalt lesen
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // Umwandlung von Markdown zu JSON (noch nicht implementiert)
            const jsonContent = convertMarkdownToJSON(fileContent);

            // Ausgabe-JSON-Datei erzeugen
            const outputFilePath = path.join(
                outputDir,
                `${path.basename(file, '.md')}.json`,
            );

            // JSON-Datei schreiben
            fs.writeFileSync(
                outputFilePath,
                JSON.stringify(jsonContent, null, 2),
            );

            console.log(`Verarbeitet: ${file} -> ${outputFilePath}`);
        }
    });
}

const inputDirectory = path.join(__dirname, '../rules');
const outputDirectory = path.join(__dirname, 'parsed-rules');

processMarkdownFiles(inputDirectory, outputDirectory);
