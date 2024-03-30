const axios = require("axios");

exports.tampilHalaman = async (req, res) => {
  // res.sendFile(path.join(__dirname, "../views", "sewa-mobil.html"));
  const data = await axios.get(`http://localhost:3000/api/cars`);

  res.render("index", { cars: data.data, layout: "layouts/main-layout" });
};

exports.deleteCar = async (req, res) => {
  // res.sendFile(path.join(__dirname, "../views", "sewa-mobil.html"));
  const { id } = req.params;
  await axios.delete(`http://localhost:3000/api/cars/${id}`);
  res.redirect("/dashboard/list-cars");
};
