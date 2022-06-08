const { Region } = require("../../../models");

module.exports = async (req, res) => {
  const sqlOptions = {
    attributes: ["id", "name"],
  };

  const regions = await Region.findAll(sqlOptions);

  return res.json({
    status: "success",
    data: regions,
  });
};
