export function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
        CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "identifier" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "username" CHARACTER VARYING UNIQUE NOT NULL,
            "password" CHARACTER VARYING NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    `);
}
export function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
}
