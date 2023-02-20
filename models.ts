export type AuthType = 'none' | 'admin' | 'customer' | null;

export interface User {
  id: string | null;
  name: string | null;
  email: string;
  password: string;
  role: AuthType | string;
}

export interface Reportaire {
  movieId: string;
  hours: string[];
  day: string;
}

export interface TicketInfo {
  type: string;
  price: number;
}

export interface Movies {
  id: string;
  title: string;
  image: string;
  descriptionShort: string;
  rating: number;
  votesNumber: string;
  premiere: boolean;
  runTime: number;
  pg: number;
  genre: string;
  day: string;
}

export interface Hour {
  time: string;
  cinemaRoomId: string;
  showingId: string;
}

export interface Movie {
  id: string;
  title: string;
  image: string;
  descriptionShort: string;
  rating: number;
  votesNumber: number;
  premiere: boolean;
  runTime: number;
  pg: number;
  genre: string;
}

export interface Reperoire {
  movie: Movie;
  day: string;
  hours: Hour[];
}

export interface Position {
  row: string;
  column: string;
}

export interface TakenSeat {
  position: Position;
  isBusy: boolean;
}

export interface Showing {
  id: string;
  movieTitle: string;
  cinemaRoomId: string;
  takenSeats: TakenSeat[];
}

// export interface Cinemarooms {
//     id: string;
//     seats: any[][];
// }

export interface Cinemarooms {
  id: string;
  seats: {
    position: { row: string; column: string };
    isBusy: boolean;
    status: boolean;
  };
}

// export interface RootObject {
//     user: User;
//     repertoire: Repertoire;
//     ticketInfo: TicketInfo[];
//     movies: Movie[];
//     reperoire: Reperoire[];
//     showings: Showing[];
//     cinemarooms: Cinemarooms;
// }
