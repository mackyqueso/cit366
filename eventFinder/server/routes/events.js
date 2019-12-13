var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Event = require("../models/event");

function returnError(res, error) {
    res.status(500).json({
        message: "An error occurrerd",
        error: error
    });
}

router.get("/", (req, res, next) => {
   Event.find()
    .then(events => {
      console.log(res);
        res.status(200).json({
            message: "Events Fetched successfully",
            events: events
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});


router.get("/:id", (req, res, next) => {
  Event.findOne({"id": req.params.id})
    .then(event => {
      res.status(200).json({
        message: "Event fetched successfully",
        event: event
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});


router.post("/", (req, res, next) => {
    const maxEventId = sequenceGenerator.nextId("events");
  
    const events = new Event({
      id: maxEventId,
      name: req.body.name,
      date: req.body.date,
      description: req.body.description
    });
  
    events
      .save()
      .then(createdMessage => {
        res.status(201).json({
          message: "Event added successfully",
          event: createdMessage
        });
      })
      .catch(error => {
        returnError(res, error);
      });
  });
  
  router.put("/:id", (req, res, next) => {
    Event.findOne({ id: req.params.id })
      .then(events => {
        console.log(req.body);
        events.name = req.body.name;
        events.date = req.body.date;
        events.description = req.body.description;
  
        Event.updateOne({ id: req.params.id }, events)
          .then(result => {
            res.status(204).json({
              message: "Event updated successfully"
            });
          })
          .catch(error => {
            returnError(res, error);
          });
      })
      .catch(error => {
        res.status(500).json({
          message: "Event not found.",
          error: { message: "Event not found" }
        });
      });
  });
  
  router.delete("/:id", (req, res, next) => {
    Event.findOne({ id: req.params.id })
      .then(events => {
        Event.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({ message: "Event deleted successfully" });
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