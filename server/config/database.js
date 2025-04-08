import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bms", "root", "Vinay@123", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Disable console logging of SQL queries
});

export default new Sequelize("bookstore", "root", "root", {
    host: "db",
    port: 3306, // Specify the port exposed by Docker
    dialect: "mysql",
    logging: false, // Disable console logging of SQL queries
});