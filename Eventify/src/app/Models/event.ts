export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageURL: string;
  totalSeats: number;
  seatsAvailable: number;
  location: Location;
  category: Category;
  participants?: any[]; // Se hai un'interfaccia per User, altrimenti potresti usarlo come any[] per ora.
  reviews?: any[];    // Stesso vale per Review, se hai un'interfaccia per Review, usala, altrimenti usa any[].
}

export enum Location {
  NAPOLI = "NAPOLI",
  ROMA = "ROMA",
  MILANO = "MILANO",
  FIRENZE = "FIRENZE",
  VENEZIA = "VENEZIA",
  TORINO = "TORINO",
  BOLOGNA = "BOLOGNA",
  PALERMO = "PALERMO",
  GENOVA = "GENOVA"
}

export enum Category {
  SPORT = "SPORT",
  MUSICA = "MUSICA",
  CULTURA = "CULTURA",
  ONLINE = "ONLINE",
  ARTE = "ARTE",
  CINEMA = "CINEMA",
  CUCINA = "CUCINA",
  TECNOLOGIA = "TECNOLOGIA",
  SPETTACOLI = "SPETTACOLI",
  FAMIGLIA = "FAMIGLIA"
}
