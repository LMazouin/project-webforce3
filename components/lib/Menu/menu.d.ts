interface IMenuItem {
  label: string;
  path: string;
  authorizations: Role[];
  onClick: (path: string) => void;
}
