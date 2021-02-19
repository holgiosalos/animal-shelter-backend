import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

const animals = [{
    name: "Bigotes",
    breed: "Male",
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

app.post('/animal', (req, res) => {
    const animal = req.body;
    if (!animals.some(e => e.name === animal.name)) {
        animals.push(animal);
    }

    res.send(animals);
});