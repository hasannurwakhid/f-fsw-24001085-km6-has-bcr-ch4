const carUsecase = require("../usecase/cars");

exports.getCars = async (req, res, next) => {
  try {
    const data = await carUsecase.getCars();
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCar(id);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCar = async (req, res, next) => {
  try {
    const { name, rent_day, size} = req.body;
    const {photo} = req.files
    if (!name || name == "") {
      return next({
        message: "Name must be provided",
        statusCode: 400,
      });
    }
    if (!rent_day || rent_day == "") {
      return next({
        message: "Rent/day must be provided",
        statusCode: 400,
      });
    }
    if (!size || size == "") {
      return next({
        message: "Size must be provided",
        statusCode: 400,
      });
    }

    const data = await carUsecase.createCar({
      name,
      rent_day,
      size,
      photo,
    });

    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, rent_day, size, photo } = req.body;
    if (!name || name == "") {
      return next({
        message: "Name must be provided",
        statusCode: 400,
      });
    }
    if (!rent_day || rent_day == "") {
      return next({
        message: "Rent/day must be provided",
        statusCode: 400,
      });
    }
    if (!size || size == "") {
      return next({
        message: "Size must be provided",
        statusCode: 400,
      });
    }

    const data = await carUsecase.updateCar(id, {
      name,
      rent_day,
      size,
      photo,
    });

    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.deleteCar(id);
    res.status(200).json({
      message: "Succes",
      data,
    });
  } catch (error) {
    next(error);
  }
};
