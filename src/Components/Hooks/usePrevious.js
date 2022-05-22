import { useEffect, useRef } from 'react';

// modified from https://usehooks.com/usePrevious/
export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
