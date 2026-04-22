import express from "express";
const app = express();
const port = 3000;
app.post("/signup", (req, res) => {
    res.send("Signup endpoint");
});
app.get("/login", (req, res) => {
    res.send("Login endpoint");
});
app.get('/chat', (req, res) => {
    res.send('Chat endpoint');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map