import { Sequelize } from "sequelize";
import configFile from "../config/config.json";
import AuthorModel from "./Author.js";
import CategoryModel from "./Category.js";
import BookModel from "./Book.js";

const config = configFile["development"];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Author = AuthorModel(sequelize);
const Category = CategoryModel(sequelize);
const Book = BookModel(sequelize);

// Define relationships
Book.belongsTo(Author, { foreignKey: "author_id", onDelete: "CASCADE" });
Book.belongsTo(Category, { foreignKey: "category_id", onDelete: "SET NULL" });

export { sequelize, Author, Category, Book };