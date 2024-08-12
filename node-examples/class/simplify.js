const fs = require('fs').promises;

// Using async/await to simplify asynchronous code
async function readFiles() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log(data);
        const anotherData = await fs.readFile('anotherFile.txt', 'utf8');
        console.log(anotherData);
    } catch (err) {
        console.error(err);
    }
}

readFiles();
console.log("This message is printed before the files are read.");
