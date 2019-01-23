import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { getUsers } from './effects';
import UserService from '../user-service';
import { connectMachine, } from '../../machine';
import { action, states } from '../../machine/service';

class UserList extends React.Component {

  // componentDidMount() {
  //   this.props.getUsers();
  // }

  componentDidMount() {
    this.props.transition(action.LOAD);
    this.props.transition(`list.${action.LOAD}`);
  }

  // render() {
  //   const { users, loading } = this.props;
  //   return <div>
  //     {loading ? 'Loading...' : users.map(user => <div key={user.id}>
  //       <Link to={`/${user.login}`}>{user.login}</Link>
  //     </div>)}
  //   </div>
  // }

  // componentWillUnmount() {
  //   this.props.transition(action.RELOAD);
  // }

  render() {
    const { machineState } = this.props;
    const { userList } = machineState.context;
    const showLoading = !userList;

    return <div>
      {showLoading ? 'Loading...' : userList.map(user => <div key={user.id}>
        <Link to={`/${user.login}`}>{user.login}</Link>
      </div>)}
    </div>
  }
}

function mapStateToProps(state, props) {
  return {
    users: state.users.list.items,
    loading: state.users.list.loading,
  }
}

const mappedActions = {
  getUsers
}

const decorate = compose(
  connect(mapStateToProps, mappedActions),
  connectMachine
)

export default decorate(UserList);