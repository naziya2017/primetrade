require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
