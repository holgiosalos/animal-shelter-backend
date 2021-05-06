const expect = require('chai').expect;
const axios = require('axios');
const faker = require('faker').random;

let createdAnimal;
let response;
describe('Given a created animal', () => {
    before(async () => {
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

        createdAnimal = (await axios.post('https://animal-shelter-back.herokuapp.com/animals', animal)).data;

    });

    describe('When the user wants to delete the animal', () => {
        before(async () => {
            response = await axios.delete(`https://animal-shelter-back.herokuapp.com/animals/${createdAnimal.name}`)
        });

        it('Then should have an OK status code', () => {
            expect(response.status).eql(200);
        });

        it('Then should return a successful message', async () => {
            expect(response.data.message).eql("Animal deleted successfully");
        });
    });
});
