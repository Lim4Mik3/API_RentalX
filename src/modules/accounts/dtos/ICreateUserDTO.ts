interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  user_id?: string;
  avatar_file?: string;
}

export { ICreateUserDTO };
