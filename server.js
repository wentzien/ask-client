const express = require('express');
const path = require('path');
const app = express();

app.use('/questions/', express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on port ${port}...)`));