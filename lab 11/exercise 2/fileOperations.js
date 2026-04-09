/**
 * VIT-AP UNIVERSITY, ANDHRA PRADESH
 * Lab Sheet 11: Node JS basics
 * Branch/ Class: B.Tech/M.Tech
 * Faculty Name: Prof. S.Gopikrishnan
 * School: SCOPE
 * 
 * Exercise 2: Develop a Node.js application that performs file operations 
 * such as creating, reading, writing, and deleting files.
 */

const fs = require('fs');

const fileName = 'example.txt';
const initialContent = 'Hello, this is the initial content of the file.\n';
const appendedContent = 'This content was appended later.\n';

console.log('Starting file operations...');

// 1. Create a new file using fs.writeFile()
fs.writeFile(fileName, initialContent, (err) => {
    if (err) {
        return console.error('Error writing file:', err);
    }
    console.log(`Successfully created and wrote to ${fileName}`);

    // 2. Read the contents of the file using fs.readFile()
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            return console.error('Error reading file:', err);
        }
        console.log('--- File Content after writing: ---');
        console.log(data);

        // 3. Append data to the existing file using fs.appendFile()
        fs.appendFile(fileName, appendedContent, (err) => {
            if (err) {
                return console.error('Error appending to file:', err);
            }
            console.log(`Successfully appended data to ${fileName}`);

            // 4. Read the contents again to verify append
            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) {
                    return console.error('Error reading file after append:', err);
                }
                console.log('--- File Content after appending: ---');
                console.log(data);

                // 5. Delete the file using fs.unlink()
                fs.unlink(fileName, (err) => {
                    if (err) {
                        return console.error('Error deleting file:', err);
                    }
                    console.log(`Successfully deleted ${fileName}`);
                    console.log('All file operations completed successfully.');
                });
            });
        });
    });
});
