import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../lib/MyButton'
import CreatePost from './CreatePost'
import Notification from './Notification'
//redux
import { connect } from 'react-redux'
//MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
//import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              {/* <MyButton tip="Create a post">
                <AddIcon color="primary" />
              </MyButton> */}
              <CreatePost />
              <Link to='/'>
                <MyButton tip="Home">
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>
              <Notification />
            </Fragment>
          ) : (
              <Fragment>
                <Link to='/'>
                  <HomeIcon color="primary" />
                </Link>
                {/* <Button color="inherit" component={Link} to='/'>Home</Button>
                <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                <Button color="inherit" component={Link} to='/login'>Login</Button> */}
              </Fragment>
            )
          }


        </Toolbar >
      </AppBar >
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(Navbar);
