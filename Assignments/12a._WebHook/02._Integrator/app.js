import express from 'express'

const PORT = process.env.PORT || 8000

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(`/webhook`, (req, res) => {
    console.log(req.body);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});