const { User, Region } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    idCardNumber: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exists",
    });
  }

  const idNumber = await User.findOne({
    where: { idCardNumber: req.body.idCardNumber },
  });

  if (idNumber) {
    return res.status(409).json({
      status: "error",
      message: "ID Card Number already exists",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    idCardNumber: req.body.idCardNumber,
    regionId: req.body.regionId,
    role: "sales",
  };

  const createdUser = await User.create(data);

  return res.json({
    status: "success",
    data: {
      id: createdUser.id,
    },
  });
};
