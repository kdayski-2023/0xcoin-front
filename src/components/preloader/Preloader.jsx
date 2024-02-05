import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import './preloader.css';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div id="preloader">
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </div>
  );
};
export default Preloader;
