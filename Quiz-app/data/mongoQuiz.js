// mongodb.js
export const mongodbQuestions = [
  {
    question: "Which type of database is MongoDB?",
    options: ["Relational", "Document-oriented", "Key-value", "Graph"],
    answer: "Document-oriented"
  },
  {
    question: "What is the default port on which MongoDB runs?",
    options: ["27017", "8080", "3306", "5432"],
    answer: "27017"
  },
  {
    question: "In MongoDB, data is stored in:",
    options: ["Tables", "Collections", "Rows", "Schemas"],
    answer: "Collections"
  },
  {
    question: "Which command is used to insert a document in MongoDB?",
    options: ["add()", "insertOne()", "put()", "addDocument()"],
    answer: "insertOne()"
  },
  {
    question: "Which method is used to retrieve all documents in a collection?",
    options: ["findAll()", "get()", "find()", "select()"],
    answer: "find()"
  },
  {
    question: "MongoDB stores documents in which format?",
    options: ["XML", "JSON", "BSON", "CSV"],
    answer: "BSON"
  },
  {
    question: "Which of the following is used to update a document in MongoDB?",
    options: ["updateDocument()", "update()", "updateOne()", "modify()"],
    answer: "updateOne()"
  },
  {
    question: "What does `db.collection.drop()` do?",
    options: ["Deletes one document", "Drops the collection", "Removes the database", "Resets the database"],
    answer: "Drops the collection"
  },
  {
    question: "Which method is used to delete a single document?",
    options: ["delete()", "removeOne()", "deleteOne()", "drop()"],
    answer: "deleteOne()"
  },
  {
    question: "Which of the following is true about MongoDB?",
    options: [
      "It enforces strict schema",
      "It stores data in tabular form",
      "It is a NoSQL database",
      "It uses SQL queries"
    ],
    answer: "It is a NoSQL database"
  }
];
