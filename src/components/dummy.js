const fs = require('fs');
const csvtojson = require('csvtojson');

// Replace 'input.csv' with the path to your CSV file
const csvFilePath = '../../../major_back/combined_csv.csv';

// Replace 'output.json' with the desired path and file name for the JSON output
const jsonFilePath = '../../../major_back/combined_json.json';

// Use csvtojson to convert CSV to JSON
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    // Write JSON to a file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2));
    console.log(`CSV file has been successfully converted to JSON and saved to ${jsonFilePath}.`);
  })
  .catch((err) => console.error(err));
