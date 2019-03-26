import { useEffect } from 'react';

const useOnClickOutside = (ref, handler) => {
  const handleClick = e => {
    if (ref && ref.current && handler && !ref.current.contains(e.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
};

export default useOnClickOutside;
