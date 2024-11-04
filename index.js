const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const hashPassword = async (password) => {
  const saltRounds = 7;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
