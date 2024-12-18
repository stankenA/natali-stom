export type ApiGoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export type ApiVkUser = {
  id: number;
  first_name: string;
  last_name: string;
  can_access_closed: boolean;
  is_closed: boolean;
  photo_200: string;
};

export type ApiUser = {
  name: string;
  avatar: string;
  email?: string;
};
