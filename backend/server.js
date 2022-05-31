const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES or API endpoints
app.use(require('./routes/products'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});