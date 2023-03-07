// DOM ELEMENTS MODAL
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementsByClassName('close');

// ------ AFFICHAGE DE LA FENÊTRE MODALE ------ //
// Ajout d'un événement pour afficher la fenêtre modale lorsque le bouton est cliqué
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
// Affiche la fenêtre modale
function launchModal() {
  modalbg.style.display = 'block';
}
// Ferme la fenêtre modale
function closeModal() {
  modalbg.style.display = 'none';
}
// Ajout d'un événement pour fermer la fenêtre modale lorsque le bouton est cliqué
closeBtn[0].addEventListener('click', closeModal);

// ------ AFFICHAGE DU MENU RESPONSIVE ------ //
// Modification du menu de navigation pour le mode responsive
function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive'; // Ajout de la classe "responsive" pour afficher le menu de navigation en mode responsive
  } else {
    x.className = 'topnav'; // Retrait de la classe "responsive" pour afficher le menu de navigation en mode standard
  }
}