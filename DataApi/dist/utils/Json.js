import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default class Json {
    static readJSONFromFile(filename) {
        const absolutePath = path.resolve(__dirname, '..', 'json', filename);
        try {
            const jsonData = fs.readFileSync(absolutePath, 'utf8');
            return JSON.parse(jsonData);
        }
        catch (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return null;
        }
    }
    static saveJSONToFile(jsonData, filename) {
        const absolutePath = path.resolve(__dirname, '..', '..', 'json', filename);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
        fs.writeFile(absolutePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
}
