

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./db/user');
const PendingUser = require('./db/pending-user');
const AccessHash = require('./db/access-hash');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./mailer');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/api/test', (req, res) => {
  res.json({message: 'Hello World!'});
})

app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.find({email});
    if (!user) {
      return res.status(422).send("User doesn't exist!");
    }

    const hasHash = await AccessHash.find({userId: user.data._id})
    if (hasHash) {
      return res.status(422).send("Email to reset password was already sent!");
    }

    // Todo: set expiration time on hash
    const aHash = await new AccessHash({userId: user.data._id });
    await sendResetPasswordEmail({toUser: user.data, hash: aHash.data._id})
    await aHash.save();
    return res.json({message: 'Please check your email in order to reset the password!'})
  } catch {
    return res.status(422).send("Ooops, something went wrong!");
  }
})
app.post('/api/reset-password/confirmation', async (req, res) => {
  const { password, hash } = req.body;

  try {
    const aHash = await AccessHash.find({_id: hash});
    if (!aHash || !aHash.data.userId) {
      return res.status(422).send("Cannot reset password!");
    }

    const user = await User.find({_id: aHash.data.userId});
    if (!user) {
      return res.status(422).send("Cannot reset password!");
    }

    await user.remove();
    await aHash.remove();
    const newUser = new User({...user.data, password});
    await newUser.hashPassword();
    await newUser.save();
    return res.json({message: 'Password has been resseted'})
  } catch {
    return res.status(422).send("Ooops, something went wrong!");
  }
})

app.get('/api/activate/user/:hash', async (req, res) => {
  const { hash } = req.params;
  try {
    const user = await PendingUser.find({_id: hash});
    const newUser = new User({...user.data});
    await newUser.save();
    await user.remove();
    res.json({message: `User ${hash} has been activated`})
  } catch {
    res.status(422).send('User cannot be activated!');
  }
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
  const { email, username, password } = req.body;
  try {
    const rUser = await User.find({email});
    const pUser = await PendingUser.find({email});
    if (pUser || rUser) { return res.status(422).send('User is already registered!');}

    const newUser = new PendingUser({email, username, password});
    await newUser.hashPassword();
    await sendConfirmationEmail({toUser: newUser.data, hash: newUser.data._id })

    const user = await newUser.save();
    res.json({message: 'You have been registered.'});
  } catch(e) {
    res.status(422).send(e.message);
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({email});
    if (!user) { return res.status(422).send('Invalid credentials!')}

    const isValid = await user.validatePassword(password);
    if (!isValid) { return res.status(422).send('Invalid password!')}

    res.json({message: 'You have been succesfuly logged in'});
  } catch(e) {
    res.status(404).send(e.message);
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`> Connected to ${PORT}`));
