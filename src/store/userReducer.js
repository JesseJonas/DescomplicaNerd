const INITIAL_STATE = {
  userName: '',
  userEmail: '',
  userLogged: 0,
  userUid: ''
};

function userReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'LOG_IN':
      return {...state, userLogged: 1, userName: action.userName, userEmail: action.userEmail, userUid: action.useruid}
    case 'LOG_OUT':
      return {...state, userLogged: 0, userName: null, userEmail: null, userUid: null}
    default:
      return state;
  }
}

export default userReducer;