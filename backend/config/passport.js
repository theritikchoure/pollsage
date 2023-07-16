const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Specify the field for the username (email in this case)
      passwordField: 'password', // Specify the field for the password
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password is incorrect, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // If user found and password is correct, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user object to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user object from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
