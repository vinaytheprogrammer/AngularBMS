import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Author from "./Author.js";
import Category from "./Category.js";

const Book = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isbn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pubDate: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "Book",
    timestamps: false,
});

// Define relationships/associations
Book.belongsTo(Author, { foreignKey: "author_id", onDelete: "CASCADE" });
Book.belongsTo(Category, { foreignKey: "category_id", onDelete: "SET NULL" });

export default Book;