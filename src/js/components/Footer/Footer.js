import React from 'react';
import { FooterRender } from './FooterRender';
import { isLoggedIn, isAnonymous } from '../../helpers/authorization';


function Footer(props) {
  if (!isLoggedIn() || isAnonymous()) {
    return null;
  }

  return (
    <footer className="footer-wrapper col-12">
      <FooterRender {...props} />
    </footer>
  )
}

export default Footer;