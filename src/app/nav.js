import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "redux-little-router";
import Connected from "react-icons/lib/fa/connectdevelop";
import SignOut from "react-icons/lib/fa/sign-out";
import Person from "react-icons/lib/fa/user";
import rough from "roughjs";

import "./nav.css";

const colors = {
  BRAND_MAIN: "#55ee429",
  BRAND_SUB: "#9933ea"
};

class Nav extends React.Component {
  componentDidMount() {
    const rc = rough.canvas(this.canvas);
    rc.rectangle(5, 5, 210, 45, { fill: colors.BRAND_MAIN });
    rc.rectangle(225, 5, 70, 45, { fill: colors.BRAND_SUB });
  }

  render() {
    const { user } = this.props;
    return (
      <nav className='navbar'>
        <div className='navbar-brand'>
          <Link className='navbar-item' href='/' title='Home'>
            <Connected className='icon is-medium logo nav-logo' />
            <h1 className='nav-title'>Pull requests</h1>
          </Link>
          <canvas
            className='rough-canvas'
            ref={canvas => {
              this.canvas = canvas;
            }}
          />
        </div>
        <div className='navbar-menu'>
          {user && (
            <div className='navbar-end'>
              <Link className='button nav-user' href='/profile' title='Profile'>
                <Person className='icon nav-user-icon' />
                <span className='nav-user-name'>{user.fullName}</span>
              </Link>
              <Link
                className='button nav-user-signout'
                title='Sign out'
                href='/sign-out'
              >
                <span>Sign out</span>
                <SignOut className='icon' />
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string
  })
};

export default connect(({ users }) => ({ user: users.user }))(Nav);
