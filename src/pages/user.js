import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../components/Post'
import StaticProfile from '../components/StaticProfile'
//mui
import Grid from '@material-ui/core/Grid'
//redux
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

class User extends Component {
  state = {
    profile: null
  }

  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios.get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts, loading } = this.props.data;
    const postsMarkup = loading ? (
      <p>loading...</p>
    ) : (
        posts === null ? (
          <p>No post from this user</p>
        ) : (
            posts.map(post =>
              <Post key={post.postId} post={post} />
            )
          ))

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <p>Content</p>
          {postsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <p>Profile</p>
          {this.state.profile === null ? (
            <p>loading profile...</p>
          ) : (
              <StaticProfile profile={this.state.profile} />
            )}
        </Grid>
      </Grid>
    )
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStatestoProps = state => ({
  data: state.data
})
export default connect(mapStatestoProps, { getUserData })(User)
