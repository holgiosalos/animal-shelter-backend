const expect = require('chai').expect;
const axios = require('axios');

let response;
describe('When the user wants to list animals', () => {
    before(async () => {
        response = await axios.get('https://animal-shelter-back.herokuapp.com/animals');
    });
    it('should have an OK status code', () => {
        expect(response.status).eql(200);
    });

    it("Should return animals with name, breed, gender, if it is vaccinated and vaccines", () => {
        const animal = response.data[0];
        expect(animal).to.have.property("name");
        expect(animal).to.have.property("breed");
        expect(animal).to.have.property("gender");
        expect(animal).to.have.property("isVaccinated");
        expect(animal).to.have.property("vaccines");
    });
});
