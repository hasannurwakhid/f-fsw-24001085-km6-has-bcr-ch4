const axios = require("axios");

exports.tampilHalaman = async (req, res) => {
  // res.sendFile(path.join(__dirname, "../views", "sewa-mobil.html"));
  const data = await axios.get(`http://localhost:3000/api/cars`);

  res.render("index", { cars: data.data, layout: "layouts/main-layout" });
};
