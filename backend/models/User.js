const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Using bcryptjs for hashing
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Hash only if the password is modified
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare hashed password (instance method)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT (instance method)
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
  return token;
};

// Static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect email');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
