import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-svg-spinner'
import Followers from 'components/Followers'
import { userRequest, dataSelector, getIsFetching, getIsFetched } from 'ducks'
import { Jumbotron } from 'reactstrap'

import './UserPage.css'

export class UserPage extends PureComponent {
  componentDidMount() {
    const { userRequest, match } = this.props

    userRequest(match.params.name)
  }

  componentDidUpdate(prevProps) {
    const { userRequest, match } = this.props

    if (prevProps.match.params.name !== this.props.match.params.name) {
      userRequest(match.params.name)
    }
  }

  render() {
    const { isFetching, isFetched, data } = this.props

    if (isFetching) {
      return (
        <div className="notifications">
          <div className="spinner-wrap">
            <Spinner className="Spinner" size="64px" gap={5} />
          </div>
        </div>
      )
    }

    if (!isFetched && !data) {
      return (
        <div className="notifications">
          <div className="sc-notification notification">
            This user does not exist.
          </div>
        </div>
      )
    }

    const { login, avatar_url, followers, public_repos } = data

    return (
      <Jumbotron className="user-block">
        <div className="user">
          <div className="user-img-wrap">
            <img className="user-img" src={avatar_url} alt={login} />
          </div>
          <div className="user-info">
            <h3>{login}</h3>
            <p>Followers: {followers}</p>
            <p>Public repos: {public_repos}</p>
          </div>
        </div>
        <Followers className="Followers" login={login} />
      </Jumbotron>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: getIsFetching(state),
    isFetched: getIsFetched(state),
    data: dataSelector(state)
  }
}

const mapDispatchToProps = {
  userRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
