/**
 *
 * @param {import("sequelize").QueryInterface} queryInterface
 * @param {*} Sequelize
 */
export function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
        {
            username: "nthorley0",
            password: "$2b$10$pw05Ub2LwTrJigU3r6I8r.OTn1QRZKTyNQgefo9HFCjGs/MGQNK3C",
        },
        {
            username: "ghiange1",
            password: "$2b$10$TREgUNf2AQnTkIq8CXCacOb2USTFAngMmFgLRAD/MV4WpA5n7oK1K",
        },
        {
            username: "dmoorman2",
            password: "$2b$10$F04uzS3x2V5Pnr81m22.6u8YplXVy.LZ0a/6rIi4NZDrV6PcBI.P6",
        },
        {
            username: "scomettoi3",
            password: "$2b$10$pco.FV62qr4iRIRcTpOjSuK965DO2GG21Z5BfcoLE3A/06nS2LrOC",
        },
        {
            username: "mbadder4",
            password: "$2b$10$ECTpzofKOWga1YioQiUN4ua1jDypGc6LJLWYMnyfEAwddHAQvRrgG",
        },
    ]);
}

/**
 *
 * @param {import("sequelize").QueryInterface} queryInterface
 * @param {*} Sequelize
 */
export function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
}
