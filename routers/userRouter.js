const router = require("express").Router();
const User = require("../db/models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateAdmin = require("./middleware/authenticateAdmin.js");
const authenticate = require("./middleware/authenticate.js");

router.get("/", authenticateAdmin, (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/me", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error decoding token", Error: err });
    }

    User.findByUsername(decodedToken.username)
      .then((user) => {
        console.log(user);
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

router.post("/register", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 14);

  req.body.password = hash;

  User.add(req.body)
    .then((user) => {
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername({ username })
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!`, token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:id", authenticateAdmin, (req, res) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", authenticateAdmin, (req, res) => {
  User.delete(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    admin: user.admin,
  };
  const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
