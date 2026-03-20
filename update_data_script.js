const fs = require('fs');
const path = 'c:\\Users\\brian_flores\\OneDrive - Foxconn Industrial Internet in North America\\Desktop\\Trend-FA-RWK-main\\dashboard_data.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.data = {
  "MB": { "LUNES": 0, "MARTES": 0, "MIERCOLES": 0, "JUEVES": 1, "VIERNES": 1 },
  "NOGA": { "LUNES": 0, "MARTES": 179, "MIERCOLES": 183, "JUEVES": 173, "VIERNES": 169 },
  "JUPITER": { "LUNES": 0, "MARTES": 101, "MIERCOLES": 92, "JUEVES": 70, "VIERNES": 78 },
  "CORDITE": { "LUNES": 0, "MARTES": 26, "MIERCOLES": 26, "JUEVES": 25, "VIERNES": 35 },
  "UPDB": { "LUNES": 0, "MARTES": 23, "MIERCOLES": 23, "JUEVES": 24, "VIERNES": 36 },
  "MIDPLANE": { "LUNES": 0, "MARTES": 18, "MIERCOLES": 22, "JUEVES": 19, "VIERNES": 17 },
  "UC Module": { "LUNES": 0, "MARTES": 16, "MIERCOLES": 16, "JUEVES": 16, "VIERNES": 16 },
  "RISER": { "LUNES": 0, "MARTES": 25, "MIERCOLES": 24, "JUEVES": 22, "VIERNES": 27 },
  "SSD": { "LUNES": 0, "MARTES": 72, "MIERCOLES": 73, "JUEVES": 70, "VIERNES": 64 }
};

fs.writeFileSync(path, JSON.stringify(data));
console.log('Data updated successfully');
