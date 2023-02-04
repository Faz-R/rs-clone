import './index.scss';
import { ReactComponent as Github } from '../../assets/icon/github.svg';
import { ReactComponent as RSLogo } from '../../assets/icon/rs_school.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <div className="authors-github">
            <Github className="footer__github" />
            <a href="https://github.com/Faz-R" className="footer__link link__github">
              <span>FazaR</span>
            </a>
            <span>&</span>
            <a href="https://github.com/DrabantBY" className="footer__link link__github">
              <span>DrabantBY</span>
            </a>
            <span>&</span>
            <a href="https://github.com/sneguroma" className="footer__link link__github">
              <span>SneguRoma</span>
            </a>
          </div>
          <span className="footer__date">2023</span>
          <a href="https://rs.school/js/" className="footer__link">
            <RSLogo className="footer__rs" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
