const express = require('express');
const cors = require('cors');
require('./config/db');
require('dotenv').config();
require('./bot');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
