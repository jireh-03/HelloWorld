const validateRegister = (body) => {
  const { username, email, password } = body;

  if (
    username === undefined ||
    email === undefined ||
    password === undefined
  ) {
    return {
      valid: false,
      message: "Username, email, and password are required",
    };
  }

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return {
      valid: false,
      message: "Username, email, and password must be strings",
    };
  }

  if (!username.trim() || !email.trim() || !password.trim()) {
    return {
      valid: false,
      message: "Username, email, and password cannot be empty",
    };
  }

  return {
    valid: true,
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
  };
};

const validateLogin = (body) => {
  const { email, password } = body;

  if (email === undefined || password === undefined) {
    return {
      valid: false,
      message: "Email and password are required",
    };
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      valid: false,
      message: "Email and password must be strings",
    };
  }

  if (!email.trim() || !password.trim()) {
    return {
      valid: false,
      message: "Email and password cannot be empty",
    };
  }

  return {
    valid: true,
    email: email.trim(),
    password: password.trim(),
  };
};

module.exports = {
  validateRegister,
  validateLogin,
};