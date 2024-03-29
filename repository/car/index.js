const {
  car,
  manufacture,
  transmission,
  type,
  option_transaction,
} = require("../../models");
const crypto = require("crypto");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData, deleteData } = require("../../helper/redis");
const path = require("path");
const manufacture = require("../../models/manufacture");

exports.getCars = async () => {
  const data = await car.findAll();
  return data;
};

exports.getCar = async (id) => {
  const key = `cars:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await car.findAll({
    where: {
      id,
    },
    include: [
      {
        model: manufacture,
      },
      {
        model: transmission,
      },
      {
        model: type,
      },
      {
        model: type,
      },
      {
        model: option_transaction,
      },
    ],
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
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
  const key = `cars:${id}`;

  // update data to postgres
  await car.update(payload, {
    where: {
      id,
    },
  });

  // get data from postgres
  const data = await car.findAll({
    where: {
      id,
    },
    include: [
      {
        model: manufacture,
      },
      {
        model: transmission,
      },
      {
        model: type,
      },
      {
        model: type,
      },
      {
        model: option_transaction,
      },
    ],
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.deleteCar = async (id) => {
  const key = `cars:${id}`;

  // delete from postgres
  await car.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
