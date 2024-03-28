const { car } = require("../../models");
const crypto = require("crypto");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData, deleteData } = require("../../helper/redis");
const path = require("path");

exports.getCars = async () => {
  const data = await car.findAll();
  return data;
};

exports.getCar = async (id) => {
  const data = await car.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    return data[0];
  }
  throw new Error("Car is not found");
};

exports.createCar = async (payload) => {
  // const data = await car.create(payload);
  // return data;

  if (payload.photo) {
    const { photo } = payload;

    photo.publicId = crypto.randomBytes(16).toString("hex");

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  }

  const data = await car.create(payload);

  const key = `cars:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateCar = async (id, payload) => {
  const data = await car.update(payload, {
    where: {
      id,
    },
  });
  return data;
};

exports.deleteCar = async (id) => {
  await car.destroy({
    where: {
      id,
    },
  });
  return null;
};
