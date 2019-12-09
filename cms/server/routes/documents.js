var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Document = require("../models/document");

function returnError(res, error) {
    res.status(500).json({
        message: "An error occurrerd",
        error: error
    });
}

router.get("/", (req, res, next) => {
   Document.find()
    .then(documents => {
        res.status(200).json({
            message: "Documents Fetched successfully",
            documents: documents
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post("/", (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
  
    const documents = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.documentUrl
    });
  
    documents
      .save()
      .then(createdMessage => {
        res.status(201).json({
          message: "Document added successfully",
          messageId: createdMessage.id
        });
      })
      .catch(error => {
        returnError(res, error);
      });
  });
  
  router.put("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(Document => {
        console.log(req.body);
        documents.name = req.body.name;
        documents.description = req.body.description;
        documents.url = req.body.documentUrl;
  
        Document.updateOne({ id: req.params.id }, documents)
          .then(result => {
            res.status(204).json({
              message: "Document updated successfully"
            });
          })
          .catch(error => {
            returnError(res, error);
          });
      })
      .catch(error => {
        res.status(500).json({
          message: "Document not found.",
          error: { documents: "Document not found" }
        });
      });
  });
  
  router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(documents => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({ documents: "Document deleted successfully" });
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