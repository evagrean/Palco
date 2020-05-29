const express = require('express');
morgan = require('morgan');

const app = express();


app.use(morgan('common'));

let topOperas = [
  {
    title: 'Frau ohne Schatten',
    composer: 'Richard Strauss'
  },
  {
    title: 'Aida',
    composer: 'Giuseppe Verdi'
  },
  {
    title: 'Les Troyens',
    composer: 'Hector Berlioz'
  },
  {
    title: 'Orfeo',
    composer: 'Claudio Monteverdi'
  },
  {
    title: 'L\'Italiana in Algeri',
    composer: 'Gioacchino Rossini'
  },
  {
    title: 'Don Pasquale',
    composer: 'Gaetano Donizetti'
  },
  {
    title: 'Norma',
    composer: 'Vincenzo Bellini'
  },
  {
    title: 'Tosca',
    composer: 'Giacomo Puccini'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my opera collection');
});

app.get('/operas', (req, res) => {
  res.json(topOperas);
});
// Serve static files
app.use('/documentation', express.static('public/documentation.html'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke');
});

// listen for requests
app.listen(3000, () => {
  console.log('App is listening on port 3000');
});