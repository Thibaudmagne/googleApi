const express = require('express');
const router = express.Router();
const recommandationService = require('../services/recommandationService');

router.get('/', (req, res) => {
  res.render('pages/index');  // Votre fichier EJS
});

router.post('/api/recommandations', async (req, res) => {
  try {
    const criteres = req.body.texte
    // const criteres_body = req.body;
    // const criteres_texte  = criteres_body.texte
    console.log("ce que j'envoie dans ma recherche: -->", criteres)
    const restaurants = await recommandationService.rechercherRestaurants(criteres);
    res.json(restaurants);
  } catch (erreur) {
    res.status(500).json({ erreur: erreur.message });
  }
});

router.post('/recommandations_escape', async (req, res) => {
  try {
    const criteres = req.body;
    const escape = await recommandationService.rechercherEscape(criteres);
    res.json(escape);
  } catch (erreur) {
    res.status(500).json({ erreur: erreur.message });
  }
});
module.exports = router;