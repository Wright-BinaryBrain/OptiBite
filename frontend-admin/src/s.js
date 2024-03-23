const { writeFile } = require("fs");

const path = "./test.json";
const config = { ip: "192.0.2.1", port: 3000 };

writeFile(path, JSON.stringify(config, null, 2), (error) => {
  if (error) {
    console.log("An error has occurred ", error);
    return;
  }
  console.log("Data written successfully to disk");
});
