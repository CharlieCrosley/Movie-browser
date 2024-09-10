import React from 'react';
import './styles/Footer.css';

interface FooterProps {
  logo: string;
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ logo, companyName }) => {
  return (
    <footer className="footer">
      <div className="footer__logo-container">
        <img className="footer__logo" src={logo} alt={companyName} />
        <p className="footer__company-name">{companyName}</p>
      </div>
      <p className="footer__copyright">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      <p className="footer__copyright">&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;