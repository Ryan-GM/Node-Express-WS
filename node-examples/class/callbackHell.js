const fs = require('fs').promises;

// Using Promises to avoid callback hell
fs.readFile('file.txt', 'utf8')
    .then(data => {
        console.log(data);
        return fs.readFile('anotherFile.txt', 'utf8');
    })
    .then(anotherData => {
        console.log(anotherData);
    })
    .catch(err => {
        console.error(err);
    });

console.log("This message is printed before the files are read.");
