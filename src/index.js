import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

const animals = [{
    name: "Manchas",
    breed: "Bengali",
    gender: "Female",
    isVaccinated: true,
    vaccines: ["rabia", "leucemia", "parvovirus"]
}]

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(PORT, () =>
    console.log(`Example app listening on ${PORT}!`),
);

app.get('/', (req, res) => {
    res.send('Animals Shelter API!');
});

app.get('/animals', (req, res) => {
    res.send(animals);
});

app.post('/animals', (req, res) => {
    const animal = req.body;
    if (!animals.some(e => e.name.toUpperCase() === animal.name.toUpperCase())) {
        animals.push(animal);
        res.status(201).send(animal);
    } else {
        res.status(409).json({ message: 'The animal has already been created' });
    }
});

app.put('/animals/:name', (req, res) => {
    const { name } = req.params;
    const { breed, gender, isVaccinated, vaccines } = req.body;
    const filteredAnimal = animals.filter(animal => animal.name.toUpperCase() === name.toUpperCase());
    if (filteredAnimal.length > 0) {
        filteredAnimal[0].breed = breed
        filteredAnimal[0].gender = gender
        filteredAnimal[0].isVaccinated = isVaccinated
        filteredAnimal[0].vaccines = vaccines
        animals.splice(animals.findIndex(animal => animal.name.toUpperCase() === name.toUpperCase()), 1, filteredAnimal[0]);
        res.status(200).send(animals.filter(animal => animal.name.toUpperCase() === name.toUpperCase())[0]);
    } else
        res.status(404).json({ message: `Animal with the name ${name} not found` });
});

app.delete('/animals/:name', (req, res) => {
    const { name } = req.params;
    const filteredAnimal = animals.filter(animal => animal.name.toUpperCase() === name.toUpperCase());
    if (filteredAnimal.length > 0) {
        animals.splice(animals.findIndex(animal => animal.name.toUpperCase() === name.toUpperCase()), 1);
        res.status(200).json({ message: `Animal deleted successfully` });
    } else
        res.status(404).json({ message: `Animal with the name ${name} not found` });
});
