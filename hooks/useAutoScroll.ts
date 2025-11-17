
import React, { useEffect } from 'react';

const useAutoScroll = <T,>(
  ref: React.RefObject<HTMLDivElement>,
  dependencies: T[]
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [ref, dependencies]);
};

export default useAutoScroll;
