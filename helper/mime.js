const path = require('path');
const data = {
    'html': 'text/html',
    'xml': 'text/xml',
    'class': 'application/octet-stream',
    'css': 'text/css', 
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'png': 'image/png',
}
module.exports = (filePath) => {
    let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase();
    if(!ext) {
        ext = filePath;
    }
    return data[ext] || data['html'];
}