import express from "express";
import JokeAPI from 'sv443-joke-api';

import path from 'path';
import { fileURLToPath } from 'url';

// Set up the __dirname equivalent for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const response = await JokeAPI.getJokes(); // Await the joke data
      const data = await response.json(); // Parse the response to JSON
    //   console.log(data)
    res.render('index', { joke: data.joke }); // Pass joke to EJS template
  } catch (error) {
    console.error(error);
    res.render('index', { joke: 'Failed to load joke.' });
  }
});

app.get('/newjoke', async (req, res) => {
  try {
    const response = await JokeAPI.getJokes();
    const data = await response.json();
    res.json({ joke: data.joke });
  } catch (error) {
    console.error(error);
    res.json({ joke: 'Failed to load new joke.' });
  }
});


app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})