"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      type: "foreign key",
      name: "USER_REGION_ID",
      fields: ["region_id"],
      references: {
        table: "regions",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "USER_REGION_ID");
  },
};
