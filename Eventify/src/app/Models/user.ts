export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  profilePicture?: string;
  role?: string;
}
