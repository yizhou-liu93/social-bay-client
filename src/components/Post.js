import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import PostDialog from './PostDialog'
import LikeButton from './LikeButton'
import MyButton from 'lib/MyButton'
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat'

//redux
import { connect } from 'react-redux'



const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}
class Post extends Component {

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount },
      user: { authenticated, credentials: { handle } }
    } = this.props;


    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteButton postId={postId} />
    ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile Image"
        />
        <CardContent className={classes.content}>
          <Typography variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >{userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            {body}
          </Typography>
          {/* {likeButton} */}
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}
const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
