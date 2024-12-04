const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Routes
const recommandationRoutes = require('./src/routes/recommandations.route');
// const inputRoutes = require('./src/routes/input.route');

app.use('/', recommandationRoutes);
// app.use('/', inputRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});