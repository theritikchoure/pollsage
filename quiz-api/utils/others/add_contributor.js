const fs = require("fs");
const axios = require("axios");
const contributors = require("./contributors");
const {
  printRed,
  printYellow,
  printGreen,
} = require("../../logs/console/console_log");

function pushContributor(newContributor) {
  try {
    const contributorsFile = __dirname + "/contributors.js";

    // Add the new contributor object to the array
    contributors.push({
      name: newContributor.name,
      image: newContributor.avatar_url,
      username: newContributor.login,
    });

    // Write the updated array back to the file
    fs.writeFileSync(
      contributorsFile,
      `module.exports = ${JSON.stringify(contributors, null, 2)}`
    );

    return true;
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function addContributor() {
  try {
    if (process.argv.length < 3) {
      printYellow("************************************************");
      console.log();
      printRed("Please provide your github username");
      console.log();
      console.log(" $ npm run add-contributor <username>");
      console.log();
      return;
    }

    let username = process.argv[2];

    // check if username is already in the contributors list
    let isAlready = contributors.filter((contributor) => {
      if (contributor.username === username) {
        return contributor;
      }
    });

    if (isAlready.length > 0) {
      printYellow("************************************************");
      console.log();
      printGreen("Contributor already added");
      console.log();
      printYellow("************************************************");
      console.log();
      return;
    }

    let res = await axios(`https://api.github.com/users/${username}`);

    pushContributor(res.data);

    printYellow("************************************************");
    console.log();
    printGreen("Contributor added successfully.");
    console.log();
    printYellow("************************************************");
    console.log();
  } catch (error) {

    if(error.response.status === 404) {
        printYellow("************************************************");
        console.log();
        printRed("Contributor with this username is not exists.");
        console.log();
        printYellow("************************************************");
        console.log();

        return;
    }

    console.log("Error: ", error.response.status);
  }
}

addContributor();
