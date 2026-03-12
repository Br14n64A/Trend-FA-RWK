const fs = require('fs');
const path = '\\\\10.12.201.25\\Lunar\\SCHEMATIC_TGZ_1\\DASHBOARD\\dashboard_data.json';

try {
    const content = fs.readFileSync(path, 'utf8');
    const stored = JSON.parse(content);

    // Reset counts for the current week but KEEP everything else
    if (stored.data) {
        for (let cat in stored.data) {
            for (let day in stored.data[cat]) {
                stored.data[cat][day] = 0;
            }
        }
    }
    
    // Increment version to force reload
    stored.version = "5.2";
    
    fs.writeFileSync(path, JSON.stringify(stored), 'utf8');
    console.log('JSON fixed. Counts reset to 0. Recovery will run on next load.');
} catch (e) {
    console.error('Failed to fix JSON:', e);
}
