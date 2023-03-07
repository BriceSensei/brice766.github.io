// DOM ELEMENTS FORM FIELDS VALIDATION
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const quantity = document.getElementById('quantity');
const birthdate = document.getElementById('birthdate');
const allLocations = document.getElementById('allLocations');
const locations = document.querySelectorAll('#allLocations .checkbox-input');
const checkbox1 = document.getElementById('checkbox1');
const input = document.getElementsByClassName('text-control');
const form = document.getElementById('form');
const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

// ------ FORM FIELDS VALIDATION ------ //
// NAMES CHECK (FIRST NAME AND LAST NAME)
function checkFirstName() {
    if (firstName.value.trim().length < 2 || first.value.trim() === '' || !firstName.value.match(regex)) { // Si le champ est vide, contient moins de 2 caractères, ou ne contient pas que des lettres
        firstName.parentElement.setAttribute('data-error-visible', 'true'); // Afficher le message d'erreur associé au champ
        firstName.style.border = '2px solid #e54858'; // Mettre une bordure rouge autour du champ
        return false; // Indiquer que la validation a échoué
    }
    first.parentElement.setAttribute('data-error-visible', 'false'); // Masquer le message d'erreur associé au champ
    first.style.border = 'solid #279e7a 0.19rem'; // Remettre la bordure normale autour du champ
    return true; // Indiquer que la validation a réussi
}

function checkLastName() {
    if (lastName.value.trim().length < 2 || last.value.trim() === "" || !lastName.value.match(regex)) {
        lastName.parentElement.setAttribute('data-error-visible', 'true');
        lastName.style.border = '2px solid #e54858';
        return false;
    }
    last.parentElement.setAttribute('data-error-visible', 'false');
    last.style.border = 'solid #279e7a 0.19rem';
    return true;
}

// EMAIL CHECK
function checkEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.trim().match(re)) {
        email.parentElement.setAttribute('data-error-visible', 'false');
        email.style.border = 'solid #279e7a 0.19rem';
        return true;
    }
    email.parentElement.setAttribute('data-error-visible', 'true');
    email.style.border = '2px solid #e54858';
    return false;
}

// BIRTHDATE CHECK
function checkBirthdate() {
    if (birthdate.value.trim().length !== 10) {
        birthdate.parentElement.setAttribute('data-error-visible', 'true');
        birthdate.style.border = '2px solid #e54858';
        return false;
    }
    birthdate.parentElement.setAttribute('data-error-visible', 'false');
    birthdate.style.border = 'solid #279e7a 0.19rem';
    return true;
}

// NUMBER OF TOURNAMENTS CHECK
function checkTournamentsQuantity() {
    if (quantity.value.trim().length === 0 || isNaN(quantity.value.trim()) === true || quantity.value.trim() < 0) {
        quantity.parentElement.setAttribute('data-error-visible', 'true');
        quantity.style.border = '2px solid #e54858';
        return false;
    }
    quantity.parentElement.setAttribute('data-error-visible', 'false');
    quantity.style.border = 'solid #279e7a 0.19rem';
    return true;
}

// LOCATIONS CHECK
function checkLocations() {
    allLocations.setAttribute('data-error-visible', 'true');
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].checked) {
            allLocations.setAttribute('data-error-visible', 'false');
            return true;
        }
    }
    return false;
}
// TERMS OF USE CHECK CHECK
// Vérification de la case à cocher des conditions d'utilisation
function checkCheckBox() {
    if (checkbox1.checked === false) { // Si la case n'est pas cochée
        checkbox1.parentElement.setAttribute('data-error-visible', 'true'); // Ajoute un attribut 'data-error-visible' à l'élément parent de la case pour afficher un message d'erreur
        return false; // Retourne false pour indiquer que la validation a échoué
    }
    checkbox1.parentElement.setAttribute('data-error-visible', 'false'); // Si la case est cochée, supprime l'attribut 'data-error-visible' de l'élément parent pour masquer le message d'erreur
    return true; // Retourne true pour indiquer que la validation est réussie
}

// FORM FIELDS EVENTS
// Événements de validation des champs de formulaire
function formFieldsValidation(element, method, event) {
    element.addEventListener(event, method); // Ajoute un écouteur d'événement à chaque élément de formulaire spécifié, avec la méthode de validation et l'événement déclencheur correspondant
}
formFieldsValidation(firstName, checkFirstName, 'focusout'); // l'utilisateur quitte le champ checkFirstName sera apppellée avec le 'focusout'
formFieldsValidation(lastName, checkLastName, 'focusout');
formFieldsValidation(email, checkEmail, 'focusout');
formFieldsValidation(birthdate, checkBirthdate, 'focusout');
formFieldsValidation(quantity, checkTournamentsQuantity, 'focusout');
formFieldsValidation(allLocations, checkLocations, 'change');
formFieldsValidation(checkbox1, checkCheckBox, 'change');

// FOR ALL FIELDS VALIDATION
// Validation de tous les champs de formulaire
function forAllFieldsValidation() {
    checkFirstName()
    checkLastName()
    checkEmail()
    checkBirthdate()
    checkTournamentsQuantity()
    checkLocations()
    checkCheckBox()
}

function formValidation() {
    // Vérification de la validité de chaque champ de formulaire
    if (checkFirstName() === true &&
        checkLastName() === true &&
        checkEmail() === true &&
        checkBirthdate() === true &&
        checkTournamentsQuantity() === true &&
        checkLocations() === true &&
        checkCheckBox() === true) {
        return true; // Si tous les champs sont valides, retourne true pour indiquer que la validation est réussie
    }
    return false; // Sinon, retourne false pour indiquer que la validation a échoué
}

// SEND FORM
// Envoi du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut
    if (formValidation() == true) { // Vérifie si la validation du formulaire est réussie
        displayModalSubmit(); // Affiche une fenêtre modale de confirmation
        document.querySelector('form').reset(); // Réinitialise le formulaire
    } else {
        forAllFieldsValidation(); // Si la validation a échoué, exécute la validation de tous les champs de formulaire pour afficher les messages d'erreur
    }
});