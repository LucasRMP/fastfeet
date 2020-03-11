import { useEffect, useRef } from 'react';

function useOutsideAlerter(onClickOutside) {
  const ref = useRef(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return [ref];
}

export default useOutsideAlerter;
