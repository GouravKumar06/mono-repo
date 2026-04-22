import express from "express";

const app = express();
const port = 3000;

app.post("/signup", (req: express.Request, res: express.Response) => {
  res.send("Signup endpoint");
});

app.get("/login", (req: express.Request, res: express.Response) => {
  res.send("Login endpoint");
});

app.get('/chat', (req: express.Request, res: express.Response) => {
  res.send('Chat endpoint');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});