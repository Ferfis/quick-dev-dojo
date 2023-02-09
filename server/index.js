require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(express.static(path.join(__dirname, 'public')));

const Routes = require('./api/routes/routes');
app.use('/', Routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
