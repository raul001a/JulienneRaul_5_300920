// JavaScript source code

// d�claration des variables utilis�es dans la fonction cardCreate puis dans firstApiRequest
let name;
let price;
let description;
let image;



// fonction pour cr�er une Card 
function cardCreate() {

    console.log("test cr�ation fonction cardCreate"); 
    
    // ajoute la premi�re div � "card group" 
    let printCard = document.getElementById('cardGroup');
    let firstDiv = document.createElement("div");
    firstDiv.setAttribute("class", "col-12 col-sm-6 col-lg-4");
    printCard.appendChild(firstDiv);

    // cr�e la second div et ses attributs
    let secondDiv = document.createElement("div");
    secondDiv.setAttribute("class", "card my-2 bg-beige shadow-lg");
    firstDiv.appendChild(secondDiv);

    // cr�e un �l�ment img et ajoute attribut src / class / alt
    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "card-img");
    img.setAttribute("alt", "photo d'appareil photo")
    secondDiv.appendChild(img); // je cr�e � la deuxi�me div de cardGroup

    // cr�ation du card body // ajoute la classe card-body et l'ajoute � la deuxi�me div de cardgroup 
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    secondDiv.appendChild(cardBody);
    // cr�e la structure htlm de cardBody 
    cardBody.innerHTML = "<div><h2></h2><div><p></p></div></div> <p></p>";

    // ajoute class � la premi�re div de card-body 
    document.querySelector(".card-body div").setAttribute("class", "card-title d-flex justify-content-between");

    // ajoute du contenu au H2 et � la div de card-title
    document.querySelector(".card-title h2").textContent = name;
    document.querySelector(".card-title div").setAttribute("class", "badge badge-success align-self-center");

    // ajout du prix dans le badge
    document.querySelector(".badge p").setAttribute("class", "h5 px-3");
    document.querySelector(".badge p").textContent = price / 100 + " euros";

    // ajout de la description dans le premier P de card-body // attention � mettre > pour s�lection 1er enfant
    document.querySelector(".card-body > p").setAttribute("class", "card-text");
    document.querySelector(".card-body > p").textContent = description;

    // cr�ation du bouton "voir le d�tail"
    let btnDetail = document.createElement("div");
    btnDetail.setAttribute("class", "text-center");
    // l'ajouter � cardBody
    cardBody.appendChild(btnDetail);
    // cr�er le lien <a> du bouton 
    let a = document.createElement("a");
    // ajouter les diff�rents attributs au a
    a.setAttribute("class", "btn btn-success stretched-link");
    a.setAttribute("role", "button");
    a.setAttribute("href", "produit.html"); //lien � modifier 
    a.textContent = "Voir le d�tail"; // regarder pourquoi accent fonctionne pas
    // ajoute le <a> au bouton
    btnDetail.appendChild(a);

    

};

// fin de la fonction cardCreate


// requ�te sur l'API principale 

    let firstApiRequest = new XMLHttpRequest();
    firstApiRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let firstApiReponse = JSON.parse(this.responseText);
            console.log(firstApiReponse); // affiche la totalit� de l'API
            console.log(firstApiReponse.length); // affiche la longueur de l'API
            console.log(firstApiReponse[0]); // affiche le d�tail du produit en index 0


            // boucle qui r�p�te autant de fois que la longueur de l'API // la boucle est bien r�p�t�e 5 fois 
            for (let i = 0; i < firstApiReponse.length; i++) {
                console.log("test boucle");
                let productDetail = firstApiReponse[i]; // r�cup�re le d�tail du produit en index i
                name = productDetail.name; // r�cup�re le nom du produit en index i
                price = productDetail.price; // r�cup�re le pric du produit en index i
                description = productDetail.description; // r�cup�re la description du produit en index i
                image = productDetail.imageUrl; // r�cup�re l'url du produit en index i

                console.log(name); // affiche le nom du produit en index i
                console.log(price); // affiche le prix du produit en index i
                console.log(description); // affiche la description du produit en index i
                console.log(image); // affiche l'url du produit en index i

                // lancer la fonction cardCreate
                cardCreate();
            }

            

        }
    };

    firstApiRequest.open("GET", "http://localhost:3000/api/cameras");
    firstApiRequest.send();











