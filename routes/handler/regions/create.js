const { Region } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const name = req.body.name;

  const schema = {
    name: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const region = await Region.findOne({
    where: { name: req.body.name },
  });

  if (region) {
    return res.status(409).json({
      status: "error",
      message: "region already exists",
    });
  }

  const createdRegion = await Region.create({
    name: name,
  });

  return res.json({
    status: "success",
    data: createdRegion,
  });
};
