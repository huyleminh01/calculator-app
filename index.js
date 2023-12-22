const bcrypt = require("bcrypt");

const saltRounds = 10;

const result = [
    {
        username: "nthorley0",
        password: "oW5W12EZ8",
    },
    {
        username: "ghiange1",
        password: "rI1naDJLDiriY",
    },
    {
        username: "dmoorman2",
        password: "tD8fqoH12",
    },
    {
        username: "scomettoi3",
        password: "iB1eQKeCvj12z",
    },
    {
        username: "mbadder4",
        password: "dA7qWutnH",
    },
].map(({ username, password }) => {
    return { username, password: bcrypt.hashSync(password, saltRounds) };
});

console.log(result);
