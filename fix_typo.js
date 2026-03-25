const fs = require('fs');
const path = 'dashboard_data.json';
try {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    if (data.seconsData && !data.secondData) {
        data.secondData = data.seconsData;
        delete data.seconsData;
        fs.writeFileSync(path, JSON.stringify(data));
        console.log('Fixed typo: seconsData -> secondData');
    } else {
        console.log('Typo not found or secondData already exists.');
    }
} catch (e) {
    console.error('Error fixing typo:', e);
}
