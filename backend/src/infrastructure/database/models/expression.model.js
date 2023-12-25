import { DataTypes } from "sequelize";
import { sequelize } from "../";

export const ExpressionModel = sequelize.define(
    "expression",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        identifier: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            references: {
                model: "user",
                key: "id",
            },
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expression: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    },
);
