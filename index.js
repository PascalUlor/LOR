// implement your API here
const express = require("express");
const Users = require("./data/db");
const cors = require("cors");

const port = 3000 || process.env;
const server = express();

server.use(express.json());
server.use(cors());

server.get("/api/users/", (req, res) => {
  Users.find()
    .then(users => {
      console.log(res);
      if (!users) {
        res.status(404).json({
          status: 404,
          message: "No users available"
        });
      }
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({
        status: 500,
        error: "The users information could not be retrieved."
      })
    );
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(users => {
      console.log(res);
      if (!users) {
        res.status(404).json({
          status: 404,
          message: `User with ${id} does not exist`
        });
      }
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({
        status: 500,
        error: "The user information could not be retrieved."
      })
    );
});

server.post("/api/users/", (req, res) => {
  const { name, bio } = req.body;
  if (name === "" || bio === "") {
    res.status(400).json({
      status: 400,
      error: "Please provide name and bio for the user."
    });
  }
  Users.insert({ name, bio })
    .then(data => {
      console.log(res);
      res.status(201).json({
        status: 201,
        id: data.id,
        message: `user with id ${data.id} created`
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        error: "There was an error while saving the user to the database"
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          status: 404,
          message: `User with ${id} does not exist`
        });
      }
      res.status(200).json(user);
    })
    .catch(err =>
      res.status(500).json({
        status: 500,
        error: "The user could not be removed"
      })
    );
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  if (name === "" || bio === "") {
    res.status(400).json({
      status: 400,
      error: "Please provide name and bio for the user."
    });
  }
  console.log(req.body, id);
  Users.update(id, { name, bio })
    .then(user => {
      res.status(200).json({
        status: 200,
        message: "update successful",
        data: { name, bio }
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        error: "The user information could not be modified."
      });
    });
});

/**
 * All wrong routes
 */
server.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Wrong route"
  });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
