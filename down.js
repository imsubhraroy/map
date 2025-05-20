const https = require('https');
const fs = require('fs');

// Define the URL of the .doc file
const fileUrl = 'https://www.adda247.com/e-books?file=70444_21726.doc';

// Function to download file
function downloadFile(url, dest) {
  const file = fs.createWriteStream(dest);  // Create a writable stream to save the file

  https.get(url, (response) => {
    response.pipe(file);  // Pipe the response data into the file
    file.on('finish', () => {
      file.close();  // Close the file stream when the download finishes
      console.log('Download complete!');
    });
  }).on('error', (err) => {
    fs.unlink(dest);  // Delete the file if an error occurs
    console.error('Error downloading the file:', err.message);
  });
}

// Trigger the download
downloadFile(fileUrl, 'downloaded-file.doc');
