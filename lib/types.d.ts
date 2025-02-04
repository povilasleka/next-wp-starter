interface User {
  email: string;
  niceName: string;
  displayName: string;
  token: string;
}

type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  user: User;
};
