const User = require('../models/User');

const signupUser = async (userData) => {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (name, password) => {
    try {
      return await User.login(name, password);
    } catch (error) {
      throw error;
    }
  };


  module.exports = {
    signupUser,
  };  