// Variable pour stocker l'ID du média actuel dans la lightbox
let actualMediaId;

// Fonction pour mettre à jour la lightbox avec les détails du média
function setMediaModal(mediaId, mediaType, mediaUrl, mediaTitle){
  // Sélection des éléments DOM pour la lightbox
  let modalImgElement = document.querySelector(".media-modal-img img");
  let modalVideoElement = document.querySelector(".media-modal-img video");
  const modalTitleElement = document.querySelector(".media-modal-title p");

  // Mise à jour des éléments DOM avec les détails du média
  modalTitleElement.textContent = mediaTitle;

  switch (mediaType) {
    case "image":
      modalImgElement.setAttribute("src", mediaUrl);
      modalImgElement.setAttribute("alt", mediaTitle);
      modalVideoElement.style.display = "none";

      modalImgElement.style.display = "flex";
      modalImgElement.focus();
      break;
    case "video":
      modalVideoElement.setAttribute("src", mediaUrl);
      modalImgElement.style.display = "none";

      modalVideoElement.setAttribute("alt", mediaTitle);
      modalVideoElement.style.display = "flex";
      modalVideoElement.focus();
      break;
    default:
      throw new Error("Unknown media type format");
  }

  actualMediaId = mediaId;
}

// Fonction pour naviguer entre les médias dans la lightbox
function mediaModalSlide(slideAction){

  // Fonction pour obtenir le chemin de l'asset du média
  getNextAssetPath = (photographerId, media) =>
    `assets/photographers/${photographerId}/${media}`;

  // Obtenir l'index du média actuel dans le tableau des médias du photographe
  const actualMediaIndex = photographer.medias.findIndex((media) => {
    if (media.id === actualMediaId) return true;
  });

  // Fonction pour afficher le prochain média dans la lightbox
  function nextSlide() {
    const nextMediaIndex = actualMediaIndex + 1;

    let nextMedia = photographer.medias[nextMediaIndex];

    if (!nextMedia) nextMedia = photographer.medias[0];

    const nextMediaType = nextMedia.image ? "image" : "video";

    const nextMediaUrl = getNextAssetPath(
      nextMedia.photographerId,
      nextMedia.image || nextMedia.video
    );

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

  // Fonction pour afficher le média précédent dans la lightbox
  function prevSlide() {
    const prevMediaIndex = actualMediaIndex - 1;

    let nextMedia = photographer.medias[prevMediaIndex];

    if (!nextMedia)
      nextMedia = photographer.medias[photographer.medias.length - 1];

    const nextMediaType = nextMedia.image ? "image" : "video";

    const nextMediaUrl = getNextAssetPath(
      nextMedia.photographerId,
      nextMedia.image || nextMedia.video
    );

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

  // Vérification de l'action de diapositive demandée
  if (slideAction) {
    switch (slideAction) {
      case -1:
        prevSlide();
        break;
      default:
        nextSlide();
        break;
    }
  }
}


// Écouteur d'événement pour la navigation du lightbox avec les flèches du clavier
document.addEventListener("keydown", (event) =>{
  // Fonction pour vérifier si le lightbox est actif
  const isMediaModalActive = () => mediaModal.style.display !== "none";
  // Récupération de la touche du clavier pressée
  const key = event.key;

  if (isMediaModalActive) {
    // Si le lightbox est actif, on vérifie quelle touche a été pressée
    switch (key) {
      case "ArrowRight":
        // Si c'est la flèche droite, on appelle la fonction mediaModalSlide avec un argument de 1 pour passer à la media suivant
        mediaModalSlide(1);
        break;
      case "ArrowLeft":
        // Si c'est la flèche gauche, on appelle la fonction mediaModalSlide avec un argument de -1 pour passer à la media précédent
        mediaModalSlide(-1);
        break;
      case "Escape":
        // Si c'est la touche d'échappement (Escape), on appelle les fonctions closeMediaModal et closeContactModal pour fermer le lightbox et le formulaire de contact (si ouvert)
        closeMediaModal();
        closeContactModal();
        break;
      default:
        // Si aucune des touches spécifiées n'est pressée, ne rien faire
    }
  }
});
