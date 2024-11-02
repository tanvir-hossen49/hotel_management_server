const app = require("./app");
const { port } = require("./secret");
const connectDatabase = require("./config/db");

app.listen(port, async () => {
  await connectDatabase();
  console.log(`hotel-management is running on port ${port}`);
});
