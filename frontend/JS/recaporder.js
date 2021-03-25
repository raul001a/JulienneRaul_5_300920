// JavaScript source code

// récupère les différents paramètres :

let param = window.location;
console.log(param);
let url = new URL(param);
let prenom = url.searchParams.get("prenom");
let total = url.searchParams.get("total"); 
let orderId = url.searchParams.get("orderId");
console.log(prenom + total + orderId);

// les ajoute dans les différents span
let prenomspan = document.getElementById("prenom");
prenomspan.textContent = prenom;

let totalspan = document.getElementById("total");
totalspan.textContent = total / 100 + " euros";

let orderIdspan = document.getElementById("orderId");
orderIdspan.textContent = orderId;