import { useState, useEffect } from 'react';

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<any>({
    width: typeof window !== 'undefined' && window.innerWidth,
    height: typeof window !== 'undefined' && window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      if(typeof window !== 'undefined'){
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;