const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');


const reviewsFilePath = path.join(__dirname, '..', 'data', 'reviews.json');


const readReviews = () => {
  const reviews = fs.readFileSync(reviewsFilePath, 'utf-8');
  return JSON.parse(reviews);
};

const writeReviews = (reviews) => {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};


const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  readReviews,
  writeReviews,
  hashPassword,
  comparePassword
};
