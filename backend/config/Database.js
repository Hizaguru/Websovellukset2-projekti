import {Sequelize} from "sequelize";
/**
 * Connects to the database
 * @param {string} database
 * @param {string} username
 * @param {string} password
 * **/
const db = new Sequelize('auth_db', 'root', 'root',{
    host: "localhost",
    dialect: "mysql"
})


export default db;