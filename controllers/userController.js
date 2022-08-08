const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = (User) => {
  // GET users
  const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);

    res.status(200).json(response);
  };

  // POST user
  const postUser = async (req, res) => {
    try {
      const user = new User(req.body);
      user.password = await bcrypt.hash(user.password, 10);

      await user.save();

      return res.status(201).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(406).send(errors);
      }
      return res.status(500).send('An error has occurred.');
    }
  };

  // PUT user by ID
  const putUserById = async (req, res) => {
    const { body } = req;

    try {
      const response = await User.updateOne(
        {
          _id: req.params.userId,
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            password: await bcrypt.hash(body.password, 10),
            email: body.email,
            address: body.address,
            phone: body.phone,
          },
        }
      );
      return res.status(200).json(response);
    } catch (error) {
      if (error.name === 'ValidationError') {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(406).send(errors);
      }
      return res.status(500).send('An error has occurred.');
    }
  };

  // DELETE user by ID
  const deleteUserById = async (req, res) => {
    const id = req.params.userId;

    try {
      await User.findByIdAndDelete(id);

      return res.status(202).json('The user has been deleted.');
    } catch (error) {
      return res.status(500).json('An error has occurred.');
    }
  };

  // GET user by ID
  const getUserById = async (req, res) => {
    const { params } = req;

    try {
      const response = await User.findById(params.userId);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json('An error has occurred.');
    }
  };

  // GET user by username
  const getUserByUserName = async (req, res) => {
    const key = Object.keys(req.query);
    const value = Object.values(req.query);
    const query = {};

    if (key[0] === 'userName') {
      query[key[0]] = value;
    } else if (key[0] === 'email') {
      query[key[0]] = value;
    }

    const response = await User.findOne(query);

    return res.status(200).json(response);
  };

  // Login Authenticator
  const userAuth = async (req, res) => {
    const { body } = req;
    const response = await User.findOne({ userName: body.userName });

    if (
      response === null ||
      !(await bcrypt.compare(body.password, response.password))
    ) {
      return res.status(401).json('Invalid credentials.');
    }

    // Create a new Token
    token = await createToken(response);

    return res.status(200).json({
      userName: response.userName,
      id: response._id,
      token: token,
    });
  };

  // Register User
  const registerUser = async (req, res) => {
    const { body } = req;
    const response = await User.findOne({ userName: body.userName });
    
    if (response !== null) {
      return res.status(401).json('User already exists.');
    } else {
      const user = new User(body);
      user.password = await bcrypt.hash(user.password, 10);

      await user.save();

      return res.status(201).json(user);
    }
  }

  // GENERATE Token
  const createToken = async (user) => {
    const token = jwt.sign(
      {
        userName: user.userName,
        id: user._id,
      },
      process.env.SIGNATURE,
      { expiresIn: '30m' }
    );

    return token;
  };

  return {
    getUsers,
    postUser,
    putUserById,
    deleteUserById,
    getUserByUserName,
    getUserById,
    userAuth,
    registerUser
  };
};

module.exports = userController;
