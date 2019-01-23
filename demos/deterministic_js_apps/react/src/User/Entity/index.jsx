import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { getUser } from './effects';
import { connectMachine } from '../../machine';
import { action, states } from '../../machine/service';

class UserEntity extends React.Component {

  // componentDidMount() {
  //   this.props.getUser(this.props.match.params.id);
  // }

  componentDidMount() {
    this.props.transition(action.LOAD);
    this.props.transition(`entity.${action.LOAD}`, this.props.match.params.id);
  }

  // render() {
  //   const { entity, loading } = this.props;
  //   return (loading ? <div>'Loading...'</div> :
  //     <div>
  //       <div>
  //         <input type="text" defaultValue={entity.name} />
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    const { machineState } = this.props;
    const { userEntity } = machineState.context;
    const showLoading = !userEntity;

    return (showLoading ? <div>Loading...</div> :
      <div>
        <div>
          <input type="text" defaultValue={userEntity.name} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    entity: state.users.entity.item,
    loading: state.users.entity.loading,
  };
}

const mappedActions = {
  getUser
}

const decorate = compose(
  connectMachine,
  connect(
    mapStateToProps,
    mappedActions
  )
)

export default decorate(UserEntity);