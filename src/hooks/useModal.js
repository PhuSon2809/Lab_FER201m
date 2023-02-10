import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toogleOpen = () => {
    setIsOpen(!isOpen);
  };

  return { toogleOpen, isOpen };
}

export { useModal };
