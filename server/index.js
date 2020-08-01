

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./db/user');
const PendingUser = require('./db/pending-user');
const AccessHash = require('./db/access-hash');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./mailer');
// second video
const CloudinaryImage = require('./db/images');
const { cloudinaryUpload } = require('./services/cloudinary');
const { dataUri } = require('./services/data-uri');
const { upload } = require('./services/multer');

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
    const user = await User.findOne({email});
    if (!user) { return res.status(422).send("User doesn't exists!"); }

    const hasHash = await AccessHash.findOne({userId: user._id});
    if (hasHash) { return res.status(422).send("Email to reset password was already sent!"); }

    const hash = new AccessHash({userId: user._id});
    await hash.save();
    await sendResetPasswordEmail({toUser: user, hash: hash._id});
    return res.json({message: 'Please check your email to reset the password!'})
  } catch {
    return res.status(422).send('Ooops, something went wrong!');
  }
})

app.post('/api/reset-password/confirmation', async (req, res) => {
  const { password, hash } = req.body;

  try {
    const aHash = await AccessHash.findOne({_id: hash});
    if (!aHash || !aHash.userId) {
      return res.status(422).send('Cannot reset a password!');
    }

    const user = await User.findOne({_id: aHash.userId});
    if (!user) {
      return res.status(422).send('Cannot reset a password!');
    }

    await user.remove();
    await aHash.remove();
    const newUser = new User({...user, password});
    await newUser.hashPassword();
    await newUser.save();
    return res.json({message: 'Password has been reseted!'});
  } catch {
    return res.status(422).send('Ooops, something went wrong!');
  }
})

app.get('/api/activate/user/:hash', async (req, res) => {
  const { hash } = req.params;
  try {
    const user = await PendingUser.findOne({_id: hash});
    const newUser = new User({...user});
    await newUser.save();
    await user.remove();
    res.json({message: `User ${hash} has been activated`})
  } catch {
    res.status(422).send('User cannot be activated!');
  }
})

app.delete('/api/user/delete', async (req, res) => {
  try {
    const user = await PendingUser.findOne({email: 'test'});
    await user.remove();
    return res.json({message: 'User has been removed!'})
  } catch(e) {
    return res.status(422).send('Cannot delete an user!');
  }
})

app.post('/api/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const rUser = await User.findOne({email});
    const pUser = await PendingUser.findOne({email});
    if (pUser || rUser) { return res.status(422).send('User is already registered!');}

    const newUser = new PendingUser({email, username, password});
    await newUser.hashPassword();
    await sendConfirmationEmail({toUser: newUser, hash: newUser._id })

    await newUser.save();
    res.json({message: 'You have been registered.'});
  } catch(e) {
    res.status(422).send(e.message);
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) { return res.status(422).send('Invalid credentials!')}

    const isValid = await user.validatePassword(password);
    if (!isValid) { return res.status(422).send('Invalid password!')}

    res.json({message: 'You have been succesfuly logged in'});
  } catch(e) {
    res.status(404).send(e.message);
  }
})

const singleUpload = upload.single('image');

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.sendApiError(
        { title: 'Upload Error',
          detail:  error.message});
    }

    next();
  })
}

app.post('/api/image-upload', singleUploadCtrl,  async (req, res) => {
  try {
    if (!req.file) { throw new Error('Image is not presented!');}
    const file64 = dataUri(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);
    const cImage = new CloudinaryImage({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url});
    await cImage.save();
    return res.json(cImage);
  } catch(error) {
    return res.status(422).json({message: error.message});
  }
});

app.get('/api/images', async (req, res) => {
  const images = await CloudinaryImage.getAll();
  return res.json(images);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`> Connected to ${PORT}`));
