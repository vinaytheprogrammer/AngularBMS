"use strict";

export const up = async (queryInterface, Sequelize) => {
  return queryInterface.addColumn("Author", "phone_no", {
    type: Sequelize.STRING(15),
    allowNull: true, // Optional, set to false if required
  });
};

export const down = async (queryInterface, Sequelize) => {
  return queryInterface.removeColumn("Author", "phone_no");
};
