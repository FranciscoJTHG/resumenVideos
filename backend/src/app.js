const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/', apiRoutes);

module.exports = app;
