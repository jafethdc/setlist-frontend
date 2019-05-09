import { useEffect, useCallback } from 'react';

const useInfiniteScroll = callback => {
  const onEndReached = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', onEndReached);
    return () => window.removeEventListener('scroll', onEndReached);
  }, [onEndReached]);
};

export default useInfiniteScroll;
