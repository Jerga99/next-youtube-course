

require('dotenv').config();
const express = require('express');
const app = express();
const User = require('./db/user');
const PendingUser = require('./db/pending-user');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/api/test', (req, res) => {
  res.json({message: 'Hello World!'});
})

app.get('api/activate/user/:hash', (req, res) => {
  const { hash } = req.params;

  res.json({message: `User ${hash} has been activated`})
})

app.delete('/api/user/delete', async (req, res) => {
  try {
    const user = await PendingUser.find({email: 'test'});
    await user.remove();
    return res.json({message: 'User has been removed!'})
  } catch(e) {
    return res.status(422).send('Cannot delete an user!');
  }
})

app.post('/api/register', async (req, res) => {
  try {
    const rUser = await User.find({email: 'test'});
    const pUser = await PendingUser.find({email: 'test'});
    if (pUser || rUser) { return res.status(422).send('User is already registered!');}

    const newUser = new PendingUser({email: 'test', username: 'testtest', password: 'hello'});
    await newUser.hashPassword();

    const user = await newUser.save();
    res.json(user);
  } catch(e) {
    res.status(422).send(e.message);
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.find({email: 'test'});
    if (!user) { return res.status(422).send('Invalid credentials!')}

    const isValid = await user.validatePassword('hello');
    if (!isValid) { return res.status(422).send('Invalid password!')}

    res.json({message: 'You have been succesfuly logged in'});
  } catch(e) {
    res.status(404).send(e.message);
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`> Connected to ${PORT}`));
