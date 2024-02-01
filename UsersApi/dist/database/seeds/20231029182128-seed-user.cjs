'use strict';
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const CPF = require('cpf');
function generateRandomNumber() {
    const min = Math.pow(10, 10); // 10^10
    const max = Math.pow(10, 11) - 1; // 10^11 - 1
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
function generateRandomUserData() {
    const name = faker.internet.userName();
    const password = bcrypt.hashSync(faker.internet.password(), 10);
    const cpf = CPF.generate();
    const email = faker.internet.email();
    const phone = generateRandomNumber();
    return {
        name,
        password,
        cpf,
        email,
        phone,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}
export {};
