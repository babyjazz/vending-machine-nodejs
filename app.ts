import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.json({ success: true });
});

app.post("/session", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.users.findFirst({
    where: { username },
  });

  const authenticated = bcrypt.compareSync(password, user?.password ?? "");
  if (!user || !authenticated) {
    res.status(401).json({ success: false, message: "invalid_credential" });
  } else {
    res.json({ success: true, data: user });
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
