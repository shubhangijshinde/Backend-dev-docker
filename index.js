const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
];

function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
  
    return schema.validate(genre);
}

app.get("/api/genres", (req, res) => {
    res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = genres.find(genre => genre.id == parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre.name);
});

app.post("/api/genres", (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let genreObj = {
        id: genres.length+1,
        name: req.body.name
    }

    genres.push(genreObj);
    res.send(genres);
});

app.put("/api/genres/:id", (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return req.status(400).send(error.details[0].message);

    let genreObj = genres.find(g => g.id === parseInt(req.params.id));

    genreObj.name = req.body.name;
    res.send(genres);
});

app.listen(3000, () => console.log("Listening on port 3000.."));