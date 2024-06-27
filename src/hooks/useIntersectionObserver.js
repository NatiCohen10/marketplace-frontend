import { useEffect, useRef } from "react";

function useIntersectionObserver(callback, options) {
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(callback, options);
    const { current: currentObserver } = observer;

    return () => currentObserver.disconnect();
  }, [callback, options]);

  return observer;
}

export default useIntersectionObserver;
