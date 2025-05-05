const fs = require("fs");
const path = require("path");

function generateVolsDynamiques() {
  const filePath = path.join(__dirname, "../data/api.json");
  const data = fs.readFileSync(filePath, "utf8");
  const volsFixes = JSON.parse(data).vols;

  const volsDynamiques = volsFixes.map((vol) => {
    const joursAleatoires = Math.floor(Math.random() * 30);
    const heureDepart = new Date();
    heureDepart.setDate(heureDepart.getDate() + joursAleatoires);
    heureDepart.setHours(Math.floor(Math.random() * 24));
    heureDepart.setMinutes([0, 15, 30, 45][Math.floor(Math.random() * 4)]);

    const dureeSplit = vol.duree.split("h");
    const h = parseInt(dureeSplit[0]);
    const m = parseInt(dureeSplit[1] || 0);
    const heureArrivee = new Date(heureDepart.getTime() + h * 60 * 60 * 1000 + m * 60 * 1000);

    return {
      ...vol,
      heureDepart: heureDepart.toISOString(),
      heureArrivee: heureArrivee.toISOString()
    };
  });

  return volsDynamiques;
}

module.exports = generateVolsDynamiques;
