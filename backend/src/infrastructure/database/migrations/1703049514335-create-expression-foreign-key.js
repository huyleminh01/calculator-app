export function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
        ALTER TABLE "expressions"
        ADD CONSTRAINT fk_expression_user
        FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
    `);
}
export function down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
        ALTER TABLE "expressions"
        DROP CONSTRAINT fk_expression_user;
    `);
}
