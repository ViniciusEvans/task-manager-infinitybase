import express from "express";

const app = express();

app.use(express.json());
app.get("", (req, res) => {
  return res.send("olá");
});

app.listen(process.env.PORT || 3000);
