export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageURL: string;
  totalSeats: number;
  seatsAvailable: number;
  location: Location;
  category: Category;
  participants?: any[];
  reviews?: any[];
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
