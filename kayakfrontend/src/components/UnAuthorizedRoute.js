import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import * as API from '../api/API';
import {changeUserState} from '../actions/changeUserStateAction';

class UnAuthorizedRoute extends Component {

  componentWillMount(){
    this.props.changeUserState(true,false);
    API.checkSession()
    .then((res)=>{
      if(res.status===201){
        this.props.changeUserState(false,true);
      }
      else{
        this.props.changeUserState(false,false);
      }
    });
  }
  
    render() {
      const { component: Component, ...rest } = this.props
      return (
        <Route {...rest} render={props => {
          if (this.props.userState.pending===undefined || this.props.userState.pending===true) return <div>...Loading...</div>
          return !(this.props.userState.logged)
            ? <Component {...this.props} />
            : <Redirect to="/" />
        }} />
      )
    }
  }
  
  const mapStateToProps= state =>{
    return{
        userState: state.userState
    };
  }

  const mapDispatchToProps = dispatch =>{
    return{
        changeUserState: (p,l) =>dispatch(changeUserState(p,l))
    }
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(UnAuthorizedRoute)