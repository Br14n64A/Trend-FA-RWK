const fs = require('fs');
const path = 'dashboard_data.json';

try {
    const content = fs.readFileSync(path, 'utf8');
    const stored = JSON.parse(content);

    // Current Categories from app.js
    const CATEGORIES = ["MB", "NOGA", "MOBO", "JUPITER", "CORDITE", "MIDPLANE", "UC Module", "HOTTER", "DOVE", "RISER", "SSD", "UPDB"];
    const DAYS = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

    // Initialize new data structure
    const newData = {};
    CATEGORIES.forEach(cat => {
        newData[cat] = {};
        DAYS.forEach(day => newData[cat][day] = 0);
    });

    // Simple category mapping matching app.js logic
    function getCategory(rawModel) {
        const trimmed = String(rawModel || '').trim();
        // Serial mappings
        if (["1A72GV900-600-G", "1A72GVS00-600-G"].includes(trimmed)) return "UPDB";
        
        const name = String(rawModel).toUpperCase();
        if (name.includes("NOGA")) return "NOGA";
        if (name.includes("JUPITER")) return "JUPITER";
        if (name.includes("CORDITE")) return "CORDITE";
        if (name.includes("MIDPLANE") || name.includes("MAKALU MP")) return "MIDPLANE";
        if (name.includes("UC MODULE")) return "UC Module";
        if (name.includes("RISER")) return "RISER";
        if (name.includes("SSD")) return "SSD";
        if (name.includes("MOBO")) return "MOBO";
        if (name.includes("UPDB")) return "UPDB";
        if (name.includes("SPARROW") || name.includes("MB") || name.includes("SWAN")) return "MB";
        return "OTHER";
    }

    function getDayFromExcelDate(val) {
        if (!val) return null;
        // Excel dates are numbers (days since 1900-01-01)
        const date = new Date((val - 25569) * 86400 * 1000);
        const dayIdx = date.getUTCDay(); // 0 (Sun) to 6 (Sat)
        const mapping = { 1: "LUNES", 2: "MARTES", 3: "MIERCOLES", 4: "JUEVES", 5: "VIERNES" };
        return mapping[dayIdx] || null;
    }

    let total = 0;
    if (stored.entradasData && stored.entradasData.length > 0) {
        stored.entradasData.forEach(row => {
            const model = row[3]; // Column D (index 3) - Part Number
            const dateVal = row[6]; // Column G (index 6) - Received Date
            const cat = getCategory(model);
            const day = getDayFromExcelDate(dateVal);
            
            if (newData[cat] && day) {
                newData[cat][day]++;
                total++;
            }
        });
    }

    stored.data = newData;
    stored.stats = { total: total, filtered: total };
    stored.version = "5.0"; // Back to matching APP_VERSION

    fs.writeFileSync(path, JSON.stringify(stored), 'utf8');
    console.log('Recovery complete. Total entries processed:', total);
} catch (e) {
    console.error('Failed to recover:', e);
}
