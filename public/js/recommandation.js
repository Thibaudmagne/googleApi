// récupération information index.html
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const textInput = document.getElementById('textInput');
    // Evenement sur bouton + récupération info champs
    submitButton.addEventListener('click', async () => {
        const texte = textInput.value;
        
        // Dans le cas ou rien n'est affiché dans le bouton
        if (!texte) {
            console.log('Veuillez entrer du texte');
            return;
        }

        try {
            // Tappe sur la route /api/recommendations, situé dans le fichier recommandation.route.js
            const response = await fetch('/api/recommandations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // envoi de la données du champs de texte 
                body: JSON.stringify({ texte: texte })
            });

            if (!response.ok) {
                throw new Error('Erreur de la requête');
            }
            // response -> données correspondant a l'api de google place
            const data = await response.json();
            console.log('Réponse reçue:', data);
            
            // Ici vous pouvez afficher les recommandations
            afficherRecommandations(data);

        } catch (error) {
            console.log("erreur ici")
            console.error('Erreur:', error);
        }
    });

     // fonction affichant la données recu de l'api google place
    function afficherRecommandations(recommandations) {
        // Créez un conteneur pour les résultats s'il n'existe pas déjà
        let container = document.getElementById('results-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'results-container';
            document.body.appendChild(container);
        }

        // Vider le conteneur existant
        container.innerHTML = '';
        console.log('Données reçues:', recommandations);
        // Afficher les recommandations
 
        recommandations.recommandation.forEach(rec => {
            const recDiv = document.createElement('div')
            recDiv.className = 'recommendation-item';

// places.displayName,places.rating,places.userRatingCount,places.primaryType
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'recommendation-input name-input';
            nameInput.value = rec.name;
            nameInput.readOnly = true;
            
            const rateInput = document.createElement('input');
            rateInput.type = 'text';
            rateInput.className = 'recommendation-input rate-input';
            rateInput.value = rec.note;
            rateInput.readOnly = true;

            const numbernoteInput = document.createElement('input')
            numbernoteInput.type = 'text';
            numbernoteInput.className = 'recommendation-input numbernote-input';
            numbernoteInput.value = rec.numbervote;
            numbernoteInput.readOnly = true;

            const typeinput = document.createElement('input')
            typeinput.type = 'text';
            typeinput.className = 'recommendation-input type-input';
            typeinput.value = rec.type;
            typeinput.readOnly = true;

            // const pricerangeinput = document.createElement('input')
            // pricerangeinput.type = 'text';
            // pricerangeinput.className = 'recommendation-input type-input';
            // pricerangeinput.value = `[${rec.prixbas} - ${rec.prixhaut}]`;
            // pricerangeinput.readOnly = true;
            ; // Adaptez selon votre structure de données
            recDiv.appendChild(nameInput);
            recDiv.appendChild(rateInput);
            recDiv.appendChild(numbernoteInput);
            recDiv.appendChild(typeinput);
            // recDiv.appendChild(pricerangeinput);

            container.appendChild(recDiv);
        });
    }
});


// // fichier js lié a ma vue route.ejs
// document.addEventListener('DOMContentLoaded', () => {
//     // Récupère la valeur des boutons
//     const submitButton = document.getElementById('submitButton');
//     const input = document.getElementById('textInput');
//     const resultArea = document.getElementById('resultArea');
//     // ACTION SUR LE CLICK
//     submitButton.addEventListener('click', () => {
//         console.log("je suis visible")
//         fetch('/process', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text: input.value })
//         })
//         .then(response => response.json())
//         .then(data => {
//             resultArea.textContent = data.processedText;
//         })
//         .catch(error => {
//             resultArea.textContent = 'Erreur de traitement';
//         });
//     });
// });