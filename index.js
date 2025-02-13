import express from 'express';
import fetch from 'node-fetch'; // Add this for making API requests
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();

    console.log('API Response:', data);
    const joke = data?.joke || 'No joke available';

    res.render('index', { joke });
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.render('index', { joke: 'Failed to load joke.' });
  }
});

app.get('/newjoke', async (req, res) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();

    console.log('New Joke API Response:', data);
    res.json({ joke: data.joke });
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.json({ joke: 'Failed to load new joke.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
