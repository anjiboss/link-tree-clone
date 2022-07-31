interface IUser {
  username: string;
  firstname: string;
  lastname: string;
  createAt: Date;
  updateAt: Date;
}

interface IMember {
  id: string;
  profileId: string;
  username: string;
  firstname: string;
  lastname: string;
  links: ILink[];
}

interface ILink {
  id: string;
  name: string;
  link: string;
}
