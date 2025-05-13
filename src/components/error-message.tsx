interface Props {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<Props> = ({ children }) => {
  return <p className="text-xs font-medium text-red-500">{children}</p>;
};
