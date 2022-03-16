// Require the file system and util node packages
const fs = require('fs');
const util = require('util');

// Function expression to change the fs.readFile function to a promise to ensure that the data is present before subsequent actions are taken.
const readFilePromise = util.promisify(fs.readFile);

// Simplifies the fs.writeFile code and error handling to a function that accepts two parameters.
const writeToFile = (file, data) =>
  fs.writeFile(file, JSON.stringify(data, 4), (err) =>
    err ? console.error(err) : console.info(`\nData successfully written to ${file}`)
    );

// combines the fs.readFile and the simplified writeToFile function into a single function expression.s
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFilePromise, writeToFile, readAndAppend };