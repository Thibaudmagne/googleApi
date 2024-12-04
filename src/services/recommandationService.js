const axios = require('axios');

class RecommandationService {
  async rechercherRestaurants(criteres) {
    try {
      // const textquery = "restaurant italien à paris"
      
      // const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        const response = await axios.post(
          'https://places.googleapis.com/v1/places:searchText',
          {
            textQuery: criteres,
            minRating: 3,
            maxResultCount: 30
            // pageSize: 20
          },
          {
            headers: {
              'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
              // 'X-Goog-FieldMask': "places.displayName,places.primaryType,places.priceRange,places.rating,places.userRatingCount,places.goodForGroups",
              'X-Goog-FieldMask': "places.displayName,places.rating,places.userRatingCount,places.primaryType,places.googleMapsLinks",
              'Content-Type': 'application/json'
            }
          }
        );
      // console.log(JSON.stringify(response.data.content, null, 2));
      // return response.data;
      console.log("MA DONNEES FORMATTER -> ", this.formaterDonnées(response.data.places))
      return this.formaterDonnées(response.data.places)
      // return this.filtrerRestaurants(response.data, criteres);
    } catch (erreur) {
      console.error('Erreur de recherche', erreur.response ? erreur.response.data : erreur.message);
      if (erreur.response) {
        console.error('Statut de l"erreur:', erreur.response.status);
        console.error('Détails complets:', JSON.stringify(erreur.response.data, null, 2));
      }
      throw erreur;
    }
  } //ChIJPaOZiWVz5kcRsEVzuQbP3UY
  
  formaterDonnées(data){
    console.log(data)
    return {
      recommandation: data.map(item=> ({
        name: item?.displayName?.text ?? 'Nom non disponible',
        note: item?.rating ?? 'note non disponible',
        numbervote: item?.userRatingCount ?? 'nombre de votes non disponible',
        type: item?.primaryType ?? 'type d"activite non disponible',
        // prixbas: item?.priceRange?.startPrice.units ?? 'prix bas non disponible',
        // prixhaut: item?.priceRange?.endPrice.units ?? 'prix haut non disponible'
      })),
      metadata: {
        total: data.length,
        source: "API google place"
    }
    }
  }
  filtrerRestaurants(resultats, criteres) {
    return resultats
      // .map(restaurant => ({
      //   nom: restaurant.name,
      //   adresse: restaurant.formatted_address,
      //   note: restaurant.rating,
      //   niveau_prix: restaurant.price_level,
      //   other: restaurant
      // }))
      // .filter(restaurant => 
      //   // Filtrage simple
      //   (!criteres.budgetMax || restaurant.niveau_prix <= criteres.budgetMax)
      // )
      // .filter(restaurant => 
      //   (restaurant.rating >= 2.2)
      // )
      // .slice(0, 10); // Limiter à 10 résultats
  }

  async rechercherEscape(criteres) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: 'parc aquatique à paris',
          key: process.env.GOOGLE_MAPS_API_KEY,
        }
      });

      return this.filtrerEscape(response.data.results, criteres);
    } catch (erreur) {
      console.error('Erreur de recherche', erreur);
      throw erreur;
    }
  }

  filtrerEscape(resultats, criteres) {
    return resultats
      .map(escape => ({
        nom: escape.name,
        adresse: escape.formatted_address,
        note: escape.rating,
        niveau_prix: escape.price_level
      }))
      .filter(escape => 
        // Filtrage simple
        (!criteres.budgetMax || escape.niveau_prix <= criteres.budgetMax)
      )
      .slice(0, 30); // Limiter à 5 résultats
  }
}

module.exports = new RecommandationService();