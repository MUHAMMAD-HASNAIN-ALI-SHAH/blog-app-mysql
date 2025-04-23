const registerValidator = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username is empty
    if (!username) {
      return res.status(400).json({ msg: "Please fill in username" });
    }

    // Check if email is empty
    if (!email) {
      return res.status(400).json({ msg: "Please fill in email" });
    }

    // Check if password is empty
    if (!password) {
      return res.status(400).json({ msg: "Please fill in password" });
    }

    // Check if password is less than 6 characters
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    // Check if the username has 3 to 16 characters
    if (username.length < 3 || username.length > 16) {
      return res
        .status(400)
        .json({ msg: "Username must be between 3 and 16 characters" });
    }

    // Check if the email is less than 20 characters
    if (email.length > 20) {
      return res
        .status(400)
        .json({ msg: "Email must be less than 20 characters" });
    }

    next();
  } catch (error) {
    console.error("Register Validator Error: " + error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const loginValidator = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email is empty
    if (!email) {
      return res.status(400).json({ msg: "Please fill in email" });
    }

    // Check if password is empty
    if (!password) {
      return res.status(400).json({ msg: "Please fill in password" });
    }

    next();
  } catch (error) {
    console.error("Login Validator Error: " + error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { registerValidator, loginValidator };
