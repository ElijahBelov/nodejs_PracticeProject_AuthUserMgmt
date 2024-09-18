const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John", "lastName": "Doe", "DOB": "22-12-1990"},
    "annasmith@gamil.com": {"firstName": "Anna", "lastName": "Smith", "DOB": "02-07-1983"},
    "peterjones@gamil.com": {"firstName": "Peter", "lastName": "Jones", "DOB": "21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/", (req, res) => {

    res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
    if (Object.hasOwn(friends, req.params.email)) {
        res.send(JSON.stringify(friends[req.params.email], null, 4));
    } else {
        res.status(404).json({message: "Email not found"});
    }
});


// POST request: Add a new friend
router.post("/", (req, res) => {
    if (req.body.email) {
        if (Object.hasOwn(friends, req.body.email)) {
            res.status(432).json({message: "User has already been added!"});
            return;
        }
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB,
        };
        res.send("The user has been added!");
    } else {
        res.status(400).json({message: "Unknown request!"});
    }
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    const email = req.params.email;

    if (!(Object.hasOwn(friends, email))) {
        res.status(433).json({message: "No user found!"});
        return;
    }
    if (Object.hasOwn(req.body, "DOB")){
        friends[email].DOB = req.body.DOB;;
    }
    if (Object.hasOwn(req.body, "firstName")){
        friends[email].firstName = req.body.firstName;;
    }
    if (Object.hasOwn(req.body, "lastName")){
        friends[email].lastName = req.body.lastName;;
    }
    res.send(`The user with email ${email} has been updated!`);

});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    const email = req.params.email;

    if (!(Object.hasOwn(friends, email))) {
        res.send(`No user with email ${email} found.`);
    } else {
        delete friends[email];
        res.send(`The user with email ${email} has been deleted.`);
    }
});

module.exports = router;
