import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.listen(PORT, () =>
    console.log(`Example app listening on ${PORT}!`),
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/animals', (req, res) => {
    res.send([{
        name: "Princesa",
        breed: "Criolla",
        gender: "Female",
        isVaccinated: true,
        vaccines: ["rabia", "leucemia", "parvovirus"]
    },
    {
        name: "Gus",
        breed: "Criolla",
        gender: "Male",
        isVaccinated: false,
        vaccines: ["rabia", "leucemia", "parvovirus", "Coronavirus"]
    }]);
});