const fs = require('fs');
const path = 'dashboard_data.json';

try {
    const content = fs.readFileSync(path, 'utf8');
    const stored = JSON.parse(content);

    const values = {
        "MB": { "VIE_ANT": 1, "LUNES": 1, "MARTES": 1 },
        "NOGA": { "VIE_ANT": 169, "LUNES": 187, "MARTES": 199 },
        "JUPITER": { "VIE_ANT": 78, "LUNES": 101, "MARTES": 133 },
        "CORDITE": { "VIE_ANT": 35, "LUNES": 39, "MARTES": 36 },
        "UPDB": { "VIE_ANT": 36, "LUNES": 77, "MARTES": 67 },
        "MIDPLANE": { "VIE_ANT": 17, "LUNES": 14, "MARTES": 14 },
        "UC Module": { "VIE_ANT": 16, "LUNES": 16, "MARTES": 16 },
        "RISER": { "VIE_ANT": 27, "LUNES": 34, "MARTES": 34 },
        "SSD": { "VIE_ANT": 64, "LUNES": 63, "MARTES": 62 }
    };

    if (stored.data) {
        for (let cat in values) {
            if (!stored.data[cat]) stored.data[cat] = {};
            stored.data[cat]["LUNES"] = values[cat]["LUNES"];
            stored.data[cat]["MARTES"] = values[cat]["MARTES"];
        }
    }

    if (stored.prevFridayData) {
        for (let cat in values) {
            if (!stored.prevFridayData[cat]) stored.prevFridayData[cat] = { "count": 0, "trend": "trend-equal" };
            const prevCount = stored.prevFridayData[cat].count;
            const newCount = values[cat]["VIE_ANT"];
            stored.prevFridayData[cat].count = newCount;
            
            // Set trends based on the logic visible in the image (Orange=Up, Green=Down, Yellow=Equal)
            // But we'll just set the counts as requested. The UI might calculate trends dynamically or we set them here.
            // Looking at the JSON, trend is fixed.
            if (cat === "MB" || cat === "UC Module") stored.prevFridayData[cat].trend = "trend-equal";
            else if (cat === "NOGA" || cat === "MIDPLANE" || cat === "SSD") stored.prevFridayData[cat].trend = "trend-down";
            else stored.prevFridayData[cat].trend = "trend-up";
        }
    }

    stored.version = "5.3"; // Force UI update
    
    fs.writeFileSync(path, JSON.stringify(stored), 'utf8');
    console.log('Successfully updated table values in dashboard_data.json');
} catch (e) {
    console.error('Failed to update values:', e);
}
