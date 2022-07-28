const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validator = require('validator')
const moment = require('moment')



function jwtSignUser(user) {
  const ONE_WEEK = 7 * 24 * 60 * 60;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async findByID(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id)
      const userObjJson = user.toJSON();
      return res.send({
        ...userObjJson,
      });
    } catch (error) {
      return res.status(400).send({ error: 'user does not exist or something else is wrong' });
    }
  },

  async deleteById(req, res) {
    const { id } = req.params
    try {
      await User.deleteOne({ _id: id })
      return res.status(200).send({ success: 'User was deleted' })
    } catch (error) {
      return res.status(400).send({ error: 'something is wrong' });
    }
  },

  async updateById(req, res) {
    const { id } = req.params;
    const update = req.body;
    try {

      const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
      const userObjJson = updatedUser.toJSON();
      return res.send({
        user: userObjJson,
      });
    } catch (error) {
      return res.status(400).send({ error: 'something is wrong' });
    }
  },

  async signup(req, res) {
    try {
      // request validation
      let { username, password, surname, firstName, birthdate } = req.body

      if (
        !moment(birthdate, "YYYY-MM-DDTHH:mm:ss.sssZ", true).isValid() ||
        !validator.isEmail(username) ||
        !validator.isAlpha(surname) ||
        !validator.isAlpha(firstName) ||
        !typeof password == 'string')
        return res.status(406).send({ error: 'input is wrong' });

      const user = await User.create(req.body);
      const userObjJson = user.toJSON();

      return res.send({
        user: userObjJson,
        token: jwtSignUser(userObjJson)
      });
    } catch (error) {
      if (Object.keys(error.keyValue[0] === 'username')) {
        return res.status(400).send({ error: 'This username already exist' });
      }
      return res.status(400).send({ error: 'something is wrong' });
    }
  },
  async login(req, res) {
    try {
      // request validation#      
      const { username, password } = req.body;

      if (
        !validator.isEmail(username) ||
        !typeof password == 'string')
        return res.status(406).send({ error: 'input is wrong' });

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(403).send({ error: 'the login information is wrong' });
      }

      const isPasswordValid = await user.verfiyPassword(password);

      if (!isPasswordValid) {
        return res.status(403).send({ error: 'the login information is wrong' });
      }
      const userObjJson = user.toJSON();
      return res.send({
        user: userObjJson,
        token: jwtSignUser(userObjJson)
      });
    } catch (error) {
      return res.status(500).send({ error });// 'we have an error we don\'t know what to do' })
    }
  }
};
