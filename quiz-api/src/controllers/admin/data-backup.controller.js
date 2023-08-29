const mongoose = require("mongoose");
const archiver = require("archiver");
const fs = require("fs");
const { handleControllerError } = require("../../../utils/helpers");
const sendMail = require("../../../config/mail");
const { Readable } = require("stream");

// Module Exports
module.exports = {
  backupDatabase,
  restoreDatabase,
  getCollections,
};

async function backupDatabase(req, res, next) {
  try {
    // sanitize the req.body.collection
    const collection = req.body.collection;
    if (collection) {
      const data = await mongoose.connection.db
        .collection(collection)
        .find()
        .toArray();
      if (data) {
        console.log(`Data retrieved from ${collection}:`, data);
      }

      // Create a Readable stream from the JSON data
      const jsonData = JSON.stringify(data);
      const readable = new Readable();
      readable.push(jsonData);
      readable.push(null);

      // Set response headers for Blob download
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${collection}.json`
      );

      // Send the data as a Blob
      readable.pipe(res);
    } else {
      const archive = archiver("zip");

      // Set the output file name
      const outputFilename = "backup.zip";
      res.attachment(outputFilename);

      // Get a list of all collections in the database
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

      // Fetch and add data from each collection to the archive
      for (const collection of collections) {
        const collectionName = collection.name;
        const data = await mongoose.connection.db
          .collection(collectionName)
          .find()
          .toArray();
        if (data) {
          console.log(`Data retrieved from ${collectionName}:`, data);
          archive.append(JSON.stringify(data), {
            name: `${collectionName}.json`,
          });
        } else {
          console.error(`Failed to retrieve data from ${collectionName}`);
        }
      }

      // Finalize the archive and send it to the client
      archive.finalize(); // Finalize the archive
      archive.pipe(res); // Send the archive data to the client
    }
  } catch (e) {
    res.status(500).send(e.message);
    throw handleControllerError(e);
  }
}

async function restoreDatabase(req, res, next) {
  try {
    // Get file details
    const filename = req.file.filename;

    let fileData = fs.readFileSync(`uploads/temp/${filename}`);

    fileData = JSON.parse(fileData.toString("utf-8"));

    fileData = fileData.map((obj) => {
      const { __v, ...rest } = obj;
      return rest;
    });

    console.log(fileData);

    res.status(200).send("Database restored successfully");

    return;

    // Delete all documents in the collection
    await mongoose.connection.db.collection("accesstokens").deleteMany({});

    await mongoose.connection.db
      .collection("accesstokens")
      .insertMany(fileData);

    // delete the file from temp folder
    fs.unlinkSync(`uploads/temp/${filename}`);

    res.status(200).send("Database restored successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
    throw handleControllerError(e);
  }
}

async function getCollections(req, res, next) {
  try {
    // Get a list of all collections in the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    return collections;
  } catch (e) {
    console.log(e);
    throw handleControllerError(e);
  }
}

async function reminderMail() {
  try {
    let mailOptions = {};

    mailOptions.to = "iasritikchourasiya@gmail.com";
    mailOptions.subject = "Reminder to backup database";
    mailOptions.html = `
      <p>Hi Admin,</p>
      <p>This is a reminder to backup the database.</p>
      <p>Regards,</p>
      <p>PollSage</p>
    `;

    await sendMail(mailOptions);
  } catch (e) {
    throw e;
  }
}

function reminder() {
  // set up a cron job to run every week to send reminder emails to admin to backup database
  const cronJobManager = require("../../cronjob/cron_job_manager.js");
  cronJobManager.addJob("backupDatabase", "0 0 * * 0", reminderMail);
}

reminder();

// backupDatabase();
