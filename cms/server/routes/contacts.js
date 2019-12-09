var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Contact = require("../models/contact");

function returnError(res, error) {
  res.status(500).json({
    contacts: "An error occurred",
    error: error
  });
}

router.get("/", (req, res, next) => {
  Contact.find()
    .then(contacts => {
      res.status(200).json({
        message: "Contacts fetched successfully",
        contacts: contacts
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get("/:id", (req, res, next) => {
  Contact.findOne({"id": req.params.id})
    .then(contact => {
      res.status(200).json({
        message: "Contact fetched successfully",
        contact: contact
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});


router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contacts = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    url: req.body.imageUrl
  });

  contacts
    .save()
    .then(createdMessage => {
      res.status(201).json({
        message: "Contact added successfully",
        messageId: createdMessage.id
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contacts => {
      console.log(req.body);
      //contacts.id = maxMessageId;
      contacts.name = req.body.name;
      contacts.email = req.body.email;
      contacts.phone = req.body.phone;
      contacts.url = req.body.imageUrl;

      Contact.updateOne({ id: req.params.id }, contacts)
        .then(result => {
          res.status(204).json({
            message: "Contact updated successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Contact not found.",
        error: { message: "Contact not found" }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contacts => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ contacts: "Contact deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;