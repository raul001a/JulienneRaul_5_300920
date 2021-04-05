// JavaScript source code


let camera;


// requête de l'API avec fetch 

fetch("http://localhost:3000/api/cameras")
    .then(function (reponse) {
        //console.log(reponse);
        //console.log("connexion réussie");
        return reponse.json();
    })

    .then(function (reponse) {
        let firstApiRequest = JSON.stringify(reponse); // transforme en texte 
        return JSON.parse(firstApiRequest); // transforme en array javascript

    })
    .then(function (firstApiReponse) {
        console.log(firstApiReponse);
        //console.log(firstApiReponse.length);
        // boucle qui répète autant de fois que la longueur de l'API // la boucle est bien répétée 5 fois 
        firstApiReponse.forEach(cardCreate(camera));
        })
    .catch(function (error) {
        console.log("erreur de chargement de l'API" + error);
    })

// fonction pour créer une Card 
function cardCreate(camera) {

    console.log(camera.name); // affiche le nom du produit 

    // ajoute la première div à "card group" 
    let printCard = document.getElementById('cardGroup');
    let firstDiv = document.createElement("div");
    firstDiv.setAttribute("class", "col-12 col-sm-6 col-lg-4 d-flex ");
    printCard.appendChild(firstDiv);

    // crée la second div et ses attributs
    let secondDiv = document.createElement("div");
    secondDiv.setAttribute("class", "card my-2 bg-beige shadow-lg");
    firstDiv.appendChild(secondDiv);

    // crée un élément img et ajoute attribut src / class / alt
    let img = document.createElement("img");
    img.setAttribute("src", camera.image);
    img.setAttribute("class", "card-img ");
    img.setAttribute("alt", "photo d'appareil photo")
    secondDiv.appendChild(img); // je crée à la deuxième div de cardGroup

    // création du card body // ajoute la classe card-body et l'ajoute à la deuxième div de cardgroup 
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    secondDiv.appendChild(cardBody);

    // création de cardTitle, enfant de cardBody
    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title d-flex justify-content-between");
    cardBody.appendChild(cardTitle);

    // création de h2 enfant de cardTitle
    let h2 = document.createElement("h2");
    h2.textContent = camera.name;
    cardTitle.appendChild(h2);

    // création du badge, enfant de cardTitle
    let badge = document.createElement("div");
    badge.setAttribute("class", "badge badge-success align-self-center");
    cardTitle.appendChild(badge);

    // remplissage du badge avec un p et le prix
    let badgeInside = document.createElement("div");
    badgeInside.setAttribute("class", "h5 px-3");
    badgeInside.textContent = camera.price / 100 + " euros";
    badge.appendChild(badgeInside);

    // création de p, enfant de cardbody, rempli avec la description
    let descriptionCard = document.createElement("p");
    descriptionCard.setAttribute("class", "card-text");
    descriptionCard.textContent = camera.description;
    cardBody.appendChild(descriptionCard);

    // création du bouton "voir le détail"
    let btnDetail = document.createElement("div");
    btnDetail.setAttribute("class", "text-center");
    // l'ajouter à cardBody
    cardBody.appendChild(btnDetail);
    // créer le lien <a> du bouton 
    let a = document.createElement("a");
    // ajouter les différents attributs au a
    a.setAttribute("class", "btn btn-success stretched-link");
    a.setAttribute("role", "button");
    a.setAttribute("href", "produit.html?" + camera.ID); //lien vers page produit en ajoutant l'ID comme paramètre
    a.textContent = "Voir plus"; // 
    // ajoute le <a> au bouton
    btnDetail.appendChild(a);
};

// fin de la fonction cardCreate
