export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  name: string;
  confirmPassword: string;
};
