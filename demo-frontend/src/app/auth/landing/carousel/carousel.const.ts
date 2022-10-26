import { ICarouselItem } from "./Icarousel-item.metadata";

export const CAROUSEL_DATA_ITEMS: ICarouselItem[] = [
    {
        id: 1,

        title:{
            first: 'Conoce gente',
            second: ' nueva'
        },
        subtitle:'¡Siempre habrá un plan para ti!',
        summary:'Deja de lado el aburrimiento y comparte tus aficiones con nuevos amigos',
        link: '/',
        image: '../../../assets/images/senderismo.jpg'

    },
    {
        id: 2,
        title:{
            first: 'Descubre nuevas',
            second: ' Aficiones'
        },
        subtitle:'¡Disfruta de nuevas experiencias!',
        summary:'Muchos planes de están esperando',

        link: '/',
        image: '../../../assets/images/yoga.jpg'

    },
    {
        id: 3,
        title:{
            first: 'Crea tu',
            second: ' Publicación'
        },
        subtitle:'¡Encuentra con quien compartir!',
        summary:'Otras personas podrán contactarte y unirse a tu plan',

        link: '/',
        image: '../../../assets/images/tenis.jpg'

    },
    {
        id: 4,
        title:{
            first: 'Promociona tu',
            second: ' negocio'
        },
        subtitle:'¡Llena tus eventos!',
        summary:'La comunidad está aguardando tu oferta de actividades',

        link: '/',
        image: '../../../assets/images/cine.jpg'

    },
    {
        id: 5,
        title:{
            first: '¿ Te',
            second: ' Apuntas ?'

        },
        subtitle:'¡Tenemos plan!',
        summary:'Pulsa el botón y únete',
        link: '/',
        image: '../../../assets/images/concierto.jpg'

    }


]
