import { createContext } from 'react';

interface NavContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NavContext = createContext<NavContextType>({
  isOpen: false,
  setIsOpen: () => {},
});
