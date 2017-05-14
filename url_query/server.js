const express = require('express');
const app = express();

app.get("/", (req, res) => {
	console.log(req.url);
	res.send(req.query.q);
});

app.listen(5000, () => {
	console.log("Server listening in on port 5000");
});
