import React, { Component } from 'react';
import logo from '../images/logo.png';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SIGN_OUT } from '../actions';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  };

  render() {
    const { authorization, signOut } = this.props;
    return (
      <nav className='main-top-nav flexbox justify-space-between'>
        <div className='logo'>
          <a className='logo-link' href='index.html'>
            <img src={logo} height='39' width='auto' alt='logo' />
          </a>
        </div>
        <div type='button' className='humburger-icon'>
          <button type='button' className='btn btn-bg-transparent'>
            <span className='icon icon-menu' />
          </button>
        </div>
        <section className='nav-mobile flexbox justify-space-between'>
          <section className='nav-tablet flexbox justify-space-center'>
            <div className='search-form'>
              <form className='my-search-form' role='search'>
                <input type='text' className='form-control' placeholder='Search' />
                <div className='search-filter radio-block'>
                  <div className='radio'>
                    <input type='radio' name='optionsRadios' id='option-jobs' value='option1' defaultChecked />
                    <label htmlFor='option-jobs'>
                      <span className='radio-text'>Jobs</span>
                    </label>
                  </div>
                  <div className='radio'>
                    <input type='radio' name='optionsRadios' id='option-talents' value='option2' />
                    <label htmlFor='option-talents'>
                      <span className='radio-text'>Talents</span>
                    </label>
                  </div>
                </div>
                <a href={window.location.pathname} type='submit' className='btn-search'>
                  <i className='icon icon-loupe' />
                </a>
              </form>
            </div>
            <div className='nav-list'>
              <ul className='flexbox justify-space-between'>
                <li className={window.location.pathname === '/board/search/job' ? 'active' : ''}>
                  <Link to='/board/search/job'>
                    FIND <div className='caret' />
                  </Link>
                </li>
                <li className={window.location.pathname === '/board/skills' ? 'active' : ''}>
                  <Link to='/board/skills'>
                    YOUR OFFICE <div className='caret' />
                  </Link>
                </li>
                <li>
                  <a href={window.location.pathname}>
                    HOW IT WORKS <div className='caret' />
                  </a>
                </li>
                <li>
                  <a href={window.location.pathname}>
                    ASK US <div className='caret' />
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <div className='user-box' onClick={this.toggleMenu}>
            <div
              className='user-photo'
              style={authorization.userData ? { backgroundImage: 'url(' + authorization.userData.image.url + ')' } : {}}
            >
              <i className='notif' />
            </div>
            <div className='user-box-nav dropdown'>
              <span
                className='dropdown-toggle'
                data-toggle='dropdown'
                role='button'
                aria-haspopup='true'
                aria-expanded='false'
              >
                {authorization.userData.full_name}
                <span className='caret' />
                <ul className='dropdown-menu' style={this.state.menuIsOpen ? { display: 'block' } : {}}>
                  <li>
                    <a data-toggle='modal' data-target='#sign-up-modal' style={{ cursor: 'pointer' }}>
                      USER SETTINGS
                    </a>
                  </li>
                  <li>
                    <a data-toggle='modal' data-target='#massege-dialogs-modal' style={{ cursor: 'pointer' }}>
                      PAYMENT ACCOUNT
                    </a>
                  </li>
                  <li onClick={signOut}>
                    <a style={{ cursor: 'pointer' }}>LOG OUT</a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </section>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authorization: state.authorization,
});

const mapDispatchToProps = dispatch => ({
  signOut: bindActionCreators(SIGN_OUT, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Navigation),
);
