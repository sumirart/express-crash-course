const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Gets all members
router.get("/", (req, res) => res.json(members));

// get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ message: `Member with id ${req.params.id} not found` });
  }
});

// create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ message: "Please insert name and email brooo!" });
  }

  members.push(newMember);
  res.status(200).json(members);
});

// update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ message: "Member updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: `Member with id ${req.params.id} not found` });
  }
});

module.exports = router;
