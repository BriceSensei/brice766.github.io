//Mettre le code JavaScript lié à la page photographer.html

let indexNumber = 0

async function getPhotographers() {
    const respons = await fetch("data/photographers.json"); // Effectue une requête fetch pour obtenir le fichier JSON contenant les données des photographes
    let data = await respons.json(); // Attend la résolution de la promesse renvoyée par fetch() et extrait les données JSON
    let photographers = [...data.photographers]; // Copie les données des photographes dans un nouvel array pour éviter de modifier les données originales
    let dataMedia = [...data.media]; // Copie les données des médias dans un nouvel array pour éviter de modifier les données originales

    photographers.forEach((photographer) => {
        // Pour chaque photographe dans le tableau des photographes
        const photographerMedias = dataMedia.filter((photographerMedia) => photographerMedia.photographerId === photographer.id);
        // Filtre les données des médias pour obtenir uniquement les médias associés au photographe actuel
        photographer.medias = [...photographerMedias];
        // Ajoute les médias filtrés dans un nouvel array dans l'objet du photographe sous la propriété "medias"
    });

    return {
        photographers
    }; // Renvoie un objet contenant le tableau des photographes mis à jour
}

const urlParams = new URLSearchParams(window.location.search); // Obtient les paramètres de l'URL de la page actuelle
const userId = urlParams.get("id"); // Obtient la valeur du paramètre d'URL "id"

// la fonction qui contrôle le header de la page individuelle
function displayPhotographerHeader() {
    indexNumber += 1; // Incrémente la variable indexNumber de 1

    // Sélection des éléments HTML du header
    const headerNameElement = document.querySelector("#photograph-name"); // Sélectionne l'élément avec l'ID "photograph-name" pour afficher le nom du photographe
    const headerCityElement = document.querySelector("#photograph-city"); // Sélectionne l'élément avec l'ID "photograph-city" pour afficher la ville du photographe
    const headerTaglineElement = document.querySelector("#photograph-tagline"); // Sélectionne l'élément avec l'ID "photograph-tagline" pour afficher le slogan du photographe
    const headerImgElement = document.querySelector("#photograph-img"); // Sélectionne l'élément avec l'ID "photograph-img" pour afficher l'image du photographe

    // Création et configuration des conteneurs pour les informations du photographe
    const infoContainer = document.createElement("div"); // Crée un nouvel élément HTML de type <div> pour contenir les informations du photographe
    infoContainer.setAttribute("tabindex", `${indexNumber += 1}`); // Définit l'attribut tabindex du conteneur en utilisant la valeur de indexNumber
    infoContainer.setAttribute("class", "info-photographer"); // Définit la classe CSS "info-photographer" pour le conteneur
    infoContainer.appendChild(headerNameElement); // Ajoute l'élément du nom du photographe comme enfant du conteneur
    infoContainer.appendChild(headerCityElement); // Ajoute l'élément de la ville du photographe comme enfant du conteneur
    infoContainer.appendChild(headerTaglineElement); // Ajoute l'élément du slogan du photographe comme enfant du conteneur

    // Création et configuration du conteneur de contact
    const contactContainer = document.createElement("div"); // Crée un nouvel élément HTML de type <div> pour contenir le bouton de contact
    contactContainer.setAttribute("tabindex", `${indexNumber += 1}`); // Définit l'attribut tabindex du conteneur en utilisant la valeur de indexNumber
    contactContainer.setAttribute("class", "contact-container"); // Définit la classe CSS "contact-container" pour le conteneur
    const contact_button = document.querySelector(".contact_button"); // Sélectionne le bouton de contact à partir de la classe CSS "contact_button"
    contactContainer.appendChild(contact_button); // Ajoute le bouton de contact comme enfant du conteneur

    // Création et configuration du conteneur de l'image
    const imgContainer = document.createElement("div"); // Crée un nouvel élément HTML de type <div> pour contenir l'image du photographe
    imgContainer.setAttribute("tabindex", `${indexNumber += 1}`); // Définit l'attribut tabindex du conteneur en utilisant la valeur de indexNumber
    imgContainer.setAttribute("class", "img-photographer"); // Définit la classe CSS "img-photographer" pour le conteneur
    imgContainer.appendChild(headerImgElement); // Ajoute l'élément de l'image du photographe comme enfant du conteneur

    const photographHeader = document.querySelector(".photograph-header"); // Sélectionne l'élément avec la classe CSS "photograph-header" pour afficher le header du photographe
    photographHeader.appendChild(infoContainer); // Ajoute le conteneur d'informations comme enfant du header
    photographHeader.appendChild(contactContainer); // Ajoute le conteneur de contact comme enfant du header
    photographHeader.appendChild(imgContainer); // Ajoute le conteneur de l'image comme enfant du header

    headerNameElement.textContent = photographer.name; // Définit le texte du nom du photographe à partir des données de l'objet "photographer"
    headerCityElement.textContent = `${photographer.city}, ${photographer.country}`; // Définit le texte de la ville et du pays du photographe à partir des données de l'objet "photographer"
    headerTaglineElement.textContent = photographer.tagline; // Définit le texte du slogan du photographe à partir des données de l'objet "photographer"
    headerImgElement.setAttribute("src", `assets/photographers/${photographer.portrait}`); // Définit l'attribut "src" de l'image du photographe en utilisant le chemin de l'image à partir des données de l'objet "photographer"
    headerImgElement.setAttribute("alt", photographer.name); // Définit l'attribut "alt" de l'image du photographe en utilisant le nom du photographe à partir des données de l'objet "photographer"
}


// La fonction qui nous ramène les Medias de chaque photographe depuis: factories/photographerMedia.js
function displayPhotographerMedia(photographer) {
    const main = document.querySelector("main"); // Sélectionne l'élément <main> dans le DOM
    const mediaSection = document.createElement("section"); // Crée un nouvel élément <section> pour afficher les médias du photographe
    mediaSection.setAttribute("id", "media-section"); // Définit l'attribut "id" de la section comme "media-section"
    mediaSection.setAttribute("class", "photographer-medias"); // Définit la classe de la section comme "photographer-medias"

    photographer.medias.forEach(async (media) => {
        // Pour chaque média du photographe, exécute la fonction de rappel de manière asynchrone
        const newMedia = new PhotographerMediaFactory(media); // Crée une nouvelle instance de la factory "PhotographerMediaFactory" pour construire l'objet média

        fetch(newMedia.mediaUrl) // Effectue une requête fetch pour obtenir les détails du média à partir de son URL
            .then((result) => {
                if (result.ok) {
                    // Si la requête est réussie (statut 200), construit le template HTML pour afficher le média
                    const mediaTemplate = `
                        <article class="photograph-media-item" data-id="${newMedia._id}">
                            <a tabindex="${indexNumber += 1}" href="#!" onclick="displayMediaModal(); setMediaModal('${newMedia._id}',
                                '${newMedia.mediaType}', '${newMedia.mediaUrl}', '${newMedia._title}')"
                                class="photograph-media-item_top">
                                ${newMedia.mediaCard}
                            </a>
                            <div class="photograph-media-item_bottom">
                                <p tabindex="${indexNumber += 1}" class="titleMedia">${newMedia._title}</p>
                                <div>
                                    <span class="photograph-media-item_bottom-likes">
                                        ${newMedia._totalLikes}
                                    </span>
                                    <a tabindex="${indexNumber += 1}" href="#!" onclick="incrementMediaLike(${newMedia._id})">
                                        <i class="fa-solid fa-heart"></i>
                                    </a>
                                </div>
                            </div>
                        </article>
                    `;
                    mediaSection.insertAdjacentHTML("beforeend", mediaTemplate); // Insère le template HTML généré dans la section des médias du photographe
                }
            })
            .catch((err) => console.error(err)); // Gère les erreurs de la requête fetch
    });

    main.appendChild(mediaSection); // Ajoute la section des médias du photographe à l'élément <main> dans le DOM
}


// la fonction qui contrôle l'ordre des Medias
function filterMedias() {
    let header = document.querySelector(".photograph-header"); // Sélectionne l'élément avec la classe "photograph-header" pour insérer les filtres après

    let filters = document.createElement('section'); // Crée un nouvel élément <section> pour les filtres
    filters.classList.add('filters'); // Ajoute la classe "filters" à la section
    filters.insertAdjacentHTML('afterbegin', '<p tabindex="${indexNumber += 1}">Trier par:</p>'); // Insère un élément <p> à l'intérieur de la section pour afficher le texte "Trier par:", avec un attribut "tabindex" généré dynamiquement
    main.appendChild(filters); // Ajoute la section de filtres à l'élément "main"

    let selection = document.createElement('select'); // Crée un nouvel élément <select> pour les options de filtrage
    selection.setAttribute("tabindex", `${indexNumber += 1}`); // Définit l'attribut "tabindex" du sélecteur à la valeur générée dynamiquement
    let filterOpions = {
        popularity: "Popularité",
        date: "Date",
        title: "Titre"
    }; // Définit un objet avec les options de filtrage possibles

    for (let option in filterOpions) { // Parcourt les options de filtrage dans l'objet
        let optionSelect = document.createElement("option"); // Crée un nouvel élément <option> pour chaque option de filtrage
        optionSelect.setAttribute("value", option); // Définit la valeur de l'option à la clé de l'objet, par exemple "popularity", "date" ou "title"
        optionSelect.innerHTML = `<div class="option">${filterOpions[option]}</div>`; // Définit le contenu HTML de l'option avec le texte de l'option de filtrage
        selection.appendChild(optionSelect); // Ajoute l'option au sélecteur
    }

    filters.appendChild(selection); // Ajoute le sélecteur à la section de filtres

    header.insertAdjacentElement("afterend", filters); // Insère la section de filtres après l'élément "header"

    selection.setAttribute("onchange", "functionalityFilter(this.value)"); // Définit un gestionnaire d'événements "onchange" sur le sélecteur pour appeler la fonction "functionalityFilter()" avec la valeur de l'option sélectionnée comme argument lorsqu'un changement est détecté
}


// la fonction qui rend opératif l'ordre des médias
function functionalityFilter(option) {
    let medias = document.querySelector("#media-section"); // Sélectionne l'élément avec l'id "media-section" pour les médias à trier
    medias.remove(); // Supprime l'élément "medias" pour effacer les médias actuellement affichés

    // Définition des fonctions de filtrage pour chaque option
    let titleFilter = () =>
        photographer.medias.sort((media1, media2) => {
            if (media1.title < media2.title) return -1;
            if (media1.title > media2.title) return 1;

            return 0;
        });

    let dateFilter = () =>
        photographer.medias.sort(
            (media1, media2) =>
            new Date(media1.date).getTime() - new Date(media2.date).getTime()
        );

    let popularityFilter = () =>
        photographer.medias.sort((media1, media2) => media2.likes - media1.likes);

    switch (option) { // Utilise une instruction switch pour déterminer quelle option de filtrage a été sélectionnée
        case "title":
            titleFilter(); // Applique le tri par titre en appelant la fonction "titleFilter()"
            break;
        case "date":
            dateFilter(); // Applique le tri par date en appelant la fonction "dateFilter()"
            break;
        default:
            popularityFilter(); // Applique le tri par popularité par défaut en appelant la fonction "popularityFilter()"

    }

    displayPhotographerMedia(photographer); // Appelle la fonction "displayPhotographerMedia()" pour afficher les médias triés du photographe mis à jour
}


// Rectangle total likes
function displayPhotographerInfos() {
    let mainControl = document.querySelector("main"); // Sélectionne l'élément "main" pour ajouter les informations du photographe

    let info = document.createElement("div"); // Crée un élément div pour les informations du photographe
    info.classList.add("sum-info"); // Ajoute la classe "sum-info" à l'élément div créé

    let totalLikes = document.createElement("span"); // Crée un élément span pour afficher le total des likes
    totalLikes.setAttribute("id", "photograph-infos-likes"); // Ajoute un attribut id à l'élément span pour définir un identifiant "photograph-infos-likes"

    let infoPrice = document.createElement("span"); // Crée un élément span pour afficher le prix
    infoPrice.setAttribute("id", "photograph-infos-price"); // Ajoute un attribut id à l'élément span pour définir un identifiant "photograph-infos-price"

    // Fonction pour calculer le total des likes des médias du photographe en utilisant la méthode reduce()
    const totalMediasLikes = () =>
        photographer.medias.reduce((acc, curr) => acc + curr.likes, 0);

    totalLikes.innerHTML = `${totalMediasLikes()} <i class="fa-solid fa-heart"></i>`; // Met à jour le contenu de l'élément span avec le total des likes et ajoute une icône de coeur
    infoPrice.textContent = `${photographer.price} €/jour`; // Met à jour le contenu de l'élément span avec le prix du photographe

    info.appendChild(totalLikes); // Ajoute l'élément span totalLikes à l'élément div info
    info.appendChild(infoPrice); // Ajoute l'élément span infoPrice à l'élément div info
    mainControl.appendChild(info); // Ajoute l'élément div info à l'élément main du document
}


// Fonction pour incrémenter/décrémenter les likes d'un média
let mediaLiked = []; // Tableau pour stocker les identifiants des médias aimés

function incrementMediaLike(mediaLikedId) {
    photographer.medias.forEach((media) => { // Parcourt le tableau des médias du photographe
        if (media.id === mediaLikedId) { // Vérifie si l'identifiant du média correspond à celui du média aimé
            if (!mediaLiked.includes(mediaLikedId)) { // Vérifie si l'identifiant du média aimé n'est pas déjà présent dans le tableau mediaLiked
                media.likes++; // Incrémente le nombre de likes du média
                document.querySelector(`[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`).innerHTML = media.likes; // Met à jour le nombre de likes affiché dans l'élément DOM correspondant au média
                mediaLiked.push(mediaLikedId); // Ajoute l'identifiant du média aimé dans le tableau mediaLiked
            } else {
                media.likes--; // Décrémente le nombre de likes du média
                document.querySelector(`[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`).innerHTML = media.likes; // Met à jour le nombre de likes affiché dans l'élément DOM correspondant au média
                mediaLiked.pop(mediaLikedId); // Retire l'identifiant du média aimé du tableau mediaLiked
            }

            displayPhotographerInfos(); // Met à jour les informations du photographe (total des likes) en appelant la fonction displayPhotographerInfos()
        }
    });
}


// la fonction du lightbox

function createMediaModal() {
    const main = document.getElementById("main");

    if (document.getElementById("media_modal")) {
        document.getElementById("media_modal").remove();
    }

    mediaModal = document.createElement("div");
    mediaModal.setAttribute("id", "media_modal");
    mediaModal.classList.add("media-modal");
    mediaModal.style.display = "none";

    const mediaModalContent = document.createElement("div");
    mediaModalContent.classList.add("media-modal-content");

    const mediaModalImg = document.createElement("div");
    mediaModalImg.classList.add("media-modal-img");

    const mediaModalImgContainer = document.createElement("div");
    mediaModalImgContainer.classList.add("media-modal-img-container");

    const image = document.createElement("img");
    image.setAttribute("src", "");
    image.setAttribute("alt", "");
    image.style.display = "none";

    const video = document.createElement("video");
    video.setAttribute("src", "");
    video.setAttribute("controls", "");
    video.setAttribute("muted", "");
    video.style.display = "none";

    const mediaModalClose = document.createElement("span");
    mediaModalClose.classList.add("media-modal-close");
    mediaModalClose.setAttribute("title", "Close");
    mediaModalClose.setAttribute("onclick", "closeMediaModal()");
    mediaModalClose.innerHTML = "&times"; /*unicode*/

    const prevMediaBtn = document.createElement("a");
    prevMediaBtn.classList.add("prev");
    prevMediaBtn.setAttribute("title", "Previous image");
    prevMediaBtn.setAttribute("onclick", "mediaModalSlide(-1)");
    prevMediaBtn.innerHTML = "<";

    const nextMediaBtn = document.createElement("a");
    nextMediaBtn.classList.add("next");
    nextMediaBtn.setAttribute("title", "Next image");
    nextMediaBtn.setAttribute("onclick", "mediaModalSlide(1)");
    nextMediaBtn.innerHTML = ">";

    const mediaTitle = document.createElement("div");
    mediaTitle.classList.add("media-modal-title");
    const p = document.createElement("p");
    mediaTitle.appendChild(p);

    mediaModalImgContainer.appendChild(image);
    mediaModalImgContainer.appendChild(video);
    mediaModalImgContainer.appendChild(mediaModalClose);
    mediaModalImgContainer.appendChild(prevMediaBtn);
    mediaModalImgContainer.appendChild(nextMediaBtn);
    mediaModalImgContainer.appendChild(mediaTitle);
    mediaModalImg.appendChild(mediaModalImgContainer);
    mediaModalContent.appendChild(mediaModalImg);
    mediaModal.appendChild(mediaModalContent);

// Insère l'élément mediaModal comme voisin immédiat de l'élément main, juste après celui-ci dans le DOM
    main.insertAdjacentElement("afterend", mediaModal);
}


function displayMediaModal() {
    let mediaModal = document.querySelector("#media_modal");
    mediaModal.style.display = "flex";
}

function closeMediaModal() {
    mediaModal.style.display = "none";
}


// la function init

async function init() {
    // Récupération des photographes via la fonction asynchrone getPhotographers() et assignation à la variable photographers
    ({ photographers } = await getPhotographers());

    // Boucle sur le tableau des photographes pour trouver le photographe correspondant à l'ID utilisateur (userId) et assignation à la variable photographer
    photographers.forEach((photographerItem) => {
        if (photographerItem.id == userId) {
            photographer = photographerItem;
        }
    });

    // Appel de différentes fonctions pour afficher le header du photographe, filtrer les médias, afficher les médias du photographe, et afficher les informations du photographe
    displayPhotographerHeader();
    filterMedias();
    displayPhotographerMedia(photographer);
    displayPhotographerInfos();
    createMediaModal();
}

// Appel de la fonction init pour démarrer l'initialisation de la page
init();
