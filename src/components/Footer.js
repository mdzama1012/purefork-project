import { Link } from 'react-router-dom';

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LOGO_URL } from '../utils/constants';

const Footer = () => {
  return (
    <div className="mt-12 flex bg-slate-100 py-12">
      {/* Right section of footer */}
      <div className="flex w-1/2 items-center justify-center">
        {/* Right footer content wrapped in a div */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-lg font-bold">
            <Link to="/">
              <img
                className="aspect-square w-14 rounded-xl object-cover transition-all hover:scale-105"
                src={LOGO_URL}
                alt="Logo"
              ></img>
            </Link>
            <span>PureFork</span>
          </div>
          <span className="font-mono text-gray-500">&#169; 2024 PureFork Limited</span>
        </div>
      </div>
      {/* Left section of footer */}
      <div className="w-1/2">
        {/* Left footer content wrapped in a div */}
        <div className="p-5">
          <h1 className="mb-5 text-3xl font-extrabold">
            For better experience, download the PureFork app now
          </h1>
          <p className="font-mono">Social Links</p>
          <ul className="flex items-center gap-3">
            <li className="hover:text-orange-600">
              <a
                href="https://www.linkedin.com/company/swiggy-in/"
                target="_blank"
                className="text-2xl"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li className="hover:text-orange-600">
              <a href="https://www.instagram.com/swiggyindia/" target="_blank" className="text-2xl">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="hover:text-orange-600">
              <a href="https://www.facebook.com/swiggy.in/" target="_blank" className="text-2xl">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className="hover:text-orange-600">
              <a href="https://in.pinterest.com/swiggyindia/" target="_blank" className="text-2xl">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </li>
            <li className="hover:text-orange-600">
              <a href="https://twitter.com/Swiggy" target="_blank" className="text-2xl">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
