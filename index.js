const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');


const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke');
});

let operas = [
  {
    id: 1,
    title: 'Frau ohne Schatten',
    composer: 'Richard Strauss',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 2,
    title: 'Aida',
    composer: 'Giuseppe Verdi',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 3,
    title: 'Les Troyens',
    composer: 'Hector Berlioz',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 4,
    title: 'Orfeo',
    composer: 'Claudio Monteverdi',
    period: {
      name: 'Early baroque',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 5,
    title: 'L\'Italiana in Algeri',
    composer: 'Gioacchino Rossini',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 6,
    title: 'Don Pasquale',
    composer: 'Gaetano Donizetti',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 7,
    title: 'Norma',
    composer: 'Vincenzo Bellini',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  },
  {
    id: 8,
    title: 'Tosca',
    composer: 'Giacomo Puccini',
    period: {
      name: 'Romanticism',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, cumque?'
    }
  }
];

let users = [
  {
    id: 1,
    username: 'eva',
    password: '',
    email: 'e@mail.com',
    birthday: ''
  }
];

// OPERA queries

// Gets list of ALL operas
app.get('/operas', (req, res) => {
  res.json(operas);
});

// Gets data about a single opera, by title
app.get('/operas/:title', (req, res) => {
  res.json(operas.find((opera) => { return opera.title === req.params.title }));
});

// Gets data about a musical period by name
app.get('/periods/:name', (req, res) => {
  res.json(periods.find((period) => { return period.name === req.params.name }));
});

// Gets data about a composer by name
app.get('/directors/:name', (req, res) => {
  res.json(composers.find((composer) => { return director.name === req.params.name }));
});

// User queries

// Gets list of all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Gets data about a single user, by name
app.get('/users/:name', (req, res) => {
  res.json(users.find((user) => { return user.name === req.params.name }));
});

// Adds a new user 
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    let message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Deletes user by id
app.delete('users/:userId', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User' + req.params.id + ' was deleted.');
  }
});

// Updates user data by username
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  res.send('Successful PUT request returning updated user info');
  // let updatedUser = req.body;

  // if(user && updatedUser) {
  //   updatedUser.id = user.id;
  //   updatedUser.favorites = user.favorites;

  //   Object.assign(user, updatedUser);

  //   users = users.map((user) => (user.id === updatedUser.id) ? updatedUser : user);
  //   res.status(201).send('User' + user + 'with id ' + req.params.id + 'was updated');
  // }

});

// Adds opera to list of favorites by id
app.post('users/:username/operas/:operaId', (req, res) => {
  res.send('Successful POST request returning list of favorites');
});

// Removes opera from list of favorites by id
app.delete('/users/:username/operas/:operaId', (req, res) => {
  res.send('Successful DELETE request returning deleted opera');
});





// listen for requests
app.listen(3000, () => {
  console.log('App is listening on port 3000');
});