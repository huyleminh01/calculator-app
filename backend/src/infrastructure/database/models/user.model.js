import { DataTypes } from "sequelize";
import { sequelize } from "../";

export const UserModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        identifier: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW,
        //     field: "created_at",
        // },
        // updatedAt: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW,
        //     field: "updated_at",
        // },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);
