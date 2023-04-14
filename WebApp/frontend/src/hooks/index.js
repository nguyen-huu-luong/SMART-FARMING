import React, { useState, useEffect, useCallback } from 'react';  
const getBootstrapSize = (width) => {
  return (
    (width >= 1400 && ['xxl']) ||
    (width >= 1200 && ['xl', 'xxl']) ||
    (width >= 992 && ['lg' ,'xl', 'xxl']) ||
    (width >= 768 && ['md', 'lg' ,'xl', 'xxl']) ||
    (width >= 576 && ['sm'])|| 
    (width <= 576 && ['lsm', 'sm'])
  );

};

export const useViewport = () => {
  const [viewport, setViewport] = useState({ width: window.innerWidth, size: getBootstrapSize(window.innerWidth) });

  const handleWindowResize = useCallback(() => {
    setViewport({ width: window.innerWidth, size: getBootstrapSize(window.innerWidth) });
  }, [window.innerWidth])
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return viewport;
};
