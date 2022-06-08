"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Fresa",
        id_card_number: "1234",
        location: "Jakarta",
        email: "fresa@sakata.com",
        password: await bcrypt.hash("fresa123", 10),
        role: "sales",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Admin",
        id_card_number: "7236",
        location: "Jakarta",
        email: "admin@sakata.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
