
const fileDb = require('./model');
const bcrypt = require('bcryptjs');

module.exports = fileDb.register('users', {
  methods: {
    hashPassword: function() {
      const user = this.data;
      return new Promise((res, rej) => {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) { return rej(err) }

          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) { return rej(err) }

            user.password = hash;
            res();
          });
        });
      })
    },
    validatePassword: function(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.data.password);
    }
  }
});
