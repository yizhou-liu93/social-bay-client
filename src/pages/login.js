import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
//MUI
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = theme => ({
  ...theme.global,
})


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {

      }
    }
  }
  /*   componentWillReceiveProps(nextProps) {
      if (nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
      }
    } */

  static getDerivedStateFromProps(props, state) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt="appIcon" className={classes.image} />
          <Typography variant="h2"
            className={classes.pageTitle}>
            Login
            </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            >
            </TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
            >
            </TextField>
            {errors.general && (
              <Typography variant='body2'
                className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Login
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                  color='secondary' />
              )}
            </Button>

            <Link to='/signup'>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Signup
            </Button>
            </Link>

          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid >
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
