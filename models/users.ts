export interface CreateUser {
  username: string;
  password: string;
  email: string;
}

export interface UserDetails {
  name: string;
  email: string;
}

export interface User {
  user: UserDetails;
}
export interface SessionProps {
  session?: User
}