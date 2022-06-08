const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    idCardNumber: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({
      where: { email },
    });

    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: "error",
        message: "email already exists",
      });
    }
  }

  const idCardNumber = req.body.idCardNumber;
  if (idCardNumber) {
    const checkIdCard = await User.findOne({
      where: { idCardNumber },
    });

    if (checkIdCard && idCardNumber !== user.idCardNumber) {
      return res.status(409).json({
        status: "error",
        message: "id card number already exists",
      });
    }
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const { name, regionId, avatar } = req.body;

  await user.update({
    email,
    password,
    name,
    regionId,
    avatar,
    idCardNumber,
  });

  return res.json({
    status: "success",
    data: {
      id: user.id,
      name,
      email,
      idCardNumber,
      regionId,
      avatar,
    },
  });
};
