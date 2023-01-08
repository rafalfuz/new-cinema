export interface User{
    id: number,
    name: string,
    role: string
}

export interface Reportaire{
    movieId: string,
    hours: string,
    day: string
}

export interface TicketInfo{
    type: string,
    price: number
}

export interface Movies{
    id: string,
    title: string,
    image: string,
    descriptionShort: string,
    rating: number,
    votesNumber: string,
    premiere: boolean,
    runTime: number,
    pg: number,
    genre: string,
    day: string
}

export interface Reperoire{
    id: string,
    title: string,
    image: string,
    descriptionShort: string,
    rating: number,
    votesNumber: string,
    premiere: boolean,
    runTime: number,
    pg: number,
    genre: string,
    day: string,
    hours:{time: string, cinemaRoomId: string, showingId: string }
}

export interface Cinemarooms{
    id: string,
    seats: {position: {row: string, column: string},
            isBusy: boolean,
            status: boolean
        }
}


