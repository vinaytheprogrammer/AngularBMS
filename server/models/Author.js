import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Author = sequelize.define("Author", {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    author: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: "Author",
    timestamps: false,
});

export default Author;