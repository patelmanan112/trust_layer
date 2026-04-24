import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 border-t text-center text-gray-500">
      &copy; {new Date().getFullYear()} TrustLayer. All rights reserved.
    </footer>
  );
};

export default Footer;
