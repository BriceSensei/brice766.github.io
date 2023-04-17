class PhotographerMediaFactory {
    constructor(media) {
        this._imageUrl = media.image;
        this._videoUrl = media.video;
       
        // Utilisation d'une déclaration de commutation (switch) pour déterminer le type de média en fonction des URL d'image et de vidéo disponibles
        switch (this.mediaType) {
            case 'image':
                // Si c'est une image, crée une instance de la classe PhotographerMediaImage et la retourne
                return new PhotographerMediaImage(media);
            case 'video':
                // Si c'est une vidéo, crée une instance de la classe PhotographerMediaVideo et la retourne
                return new PhotographerMediaVideo(media);
            default:
                // Si le format du média n'est pas reconnu, lance une erreur
                throw new Error('Unknown media format');
        }
    }

    get mediaType() {
        // Détermine le type de média en fonction de la disponibilité de l'URL d'image ou d'URL de vidéo
        if (this._imageUrl) return 'image';
        else if (this._videoUrl) return 'video';
        else throw new Error('Unknown media type format');
    }
}

class PhotographerMediaImage {
    constructor(media) {
        this._photographerId = media.photographerId;
        this._id = media.id;
        this._title = media.title;
        this._imageUrl = media.image;
        this._totalLikes = media.likes;
    }

    get mediaUrl() {
        // Retourne l'URL complète de l'image en fonction de l'ID du photographe et de l'URL de l'image
        return `assets/photographers/${this._photographerId}/${this._imageUrl}`;
    }

    get mediaType() {
        // Retourne le type de média, dans ce cas 'image'
        return 'image';
    }

    get mediaCard() {
        // Retourne une balise HTML d'image avec l'URL de l'image, le titre et la description
        return `<img src="${this.mediaUrl}" title="${this._title}, closeup view" alt="${this._title}">`;
    }
}

class PhotographerMediaVideo {
    constructor(media) {
        this._photographerId = media.photographerId;
        this._id = media.id;
        this._title = media.title;
        this._videoUrl = media.video;
        this._totalLikes = media.likes;
    }

    get mediaUrl() {
        // Retourne l'URL complète de la vidéo en fonction de l'ID du photographe et de l'URL de la vidéo
        return `assets/photographers/${this._photographerId}/${this._videoUrl}`;
    }

    get mediaType() {
        // Retourne le type de média, dans ce cas 'video'
        return 'video';
    }

    get mediaCard() {
        // Retourne une balise HTML de vidéo avec l'URL de la vidéo, le titre et la description
        return `<video muted> <source src="${this.mediaUrl}#t=0.1" type="video/mp4" title="${this._title}, closeup view" alt="${this._title}"> Your browser does not support the video tag. </video>`;
    }
}
