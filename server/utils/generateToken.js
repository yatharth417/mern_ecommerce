const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // Create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Save token in a secure HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents XSS attacks (Client JS cannot read this)
    secure: false, // Only use HTTPS in production
    sameSite: 'lax', // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

module.exports = generateToken;