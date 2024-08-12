const fs = require('fs');

// Node.js example of non-blocking I/O
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

console.log("This message is printed before the file is read.");
