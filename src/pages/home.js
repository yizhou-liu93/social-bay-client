import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Post from '../components/Post'
import Profile from '../components/Profile'
import PostSkeleton from '../lib/PostSkeleton'
import PropTypes from 'prop-types'
//redux
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'
class Home extends Component {
  state = {
    posts: null
  }
  componentDidMount() {
    /* axios.get('/posts')
      .then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err)) */
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;

    let recentPostsMarkup = loading ?
      //
      <PostSkeleton />
      : posts.map(post =>
        <Post key={post.postId} post={post} />
      )

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <p>Content</p>
          {recentPostsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <p>Profile</p>
          <Profile />
        </Grid>
      </Grid>


    )
  }
}
Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getPosts })(Home);
