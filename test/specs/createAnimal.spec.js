const expect = require('chai').expect;
const axios = require('axios');
const faker = require('faker').random;

const animal = {
    name: `Mr ${faker.words(2)}`,
    breed: "Bengalí",
    gender: "Female",
    isVaccinated: true,
    vaccines: [
        "rabia",
        "leucemia",
        "parvovirus"
    ]
};

let response;
describe('When the user wants to create an animal', () => {
    before(async () => {
        response = await axios.post('http://localhost:8080/animal', animal);
    });

    it('should have a created status code', () => {
        expect(response.status).eql(201);
    });

    it('should return the created animal', () => {
        const createdAnimal = response.data;
        expect(createdAnimal.name).eql(animal.name);
        expect(createdAnimal.breed).eql(animal.breed);
        expect(createdAnimal.gender).eql(animal.gender);
        expect(createdAnimal.isVaccinated).eql(animal.isVaccinated);
        expect(createdAnimal.vaccines).eql(animal.vaccines);
    });

    it('should return a json as response', () => {
        const headers = response.headers;
        expect(headers["content-type"]).to.contain("application/json");
    });
});
