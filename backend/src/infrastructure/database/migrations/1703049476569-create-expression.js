export function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
        CREATE TABLE "expressions" (
            "id" SERIAL PRIMARY KEY,
            "identifier" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "user_id" INTEGER NOT NULL,
            "result" CHARACTER VARYING NOT NULL,
            "expression" CHARACTER VARYING NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    `);
}
export function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
}
