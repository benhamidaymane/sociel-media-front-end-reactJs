const AuthReducer =(state,action)=>{
    switch (action.type) {
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            }
        

        case "LOGIN_SUCCESS":
            return{
                    user:action.payload,
                    isFetching:false,
                    error:false,
            }

            case "LOGIN_FAILURE":
                return{
                        user:null,
                        isFetching:false,
                        error:action.payload,
                }

            case "FOLLOW":
                return{
                    ...state,
                    user:{
                        ...state.user,
                        followins:[...state.user.followins,action.payload],

                    }
                }
            case "UNFOLLOW":
                return{
                    ...state,
                    user:{
                        ...state.user,
                        followins:state.user.followins.filter(
                            followins=>followins !== action.payload
                            )
                            
                    }
                }
    
        default:
            return state
    }
}

export default AuthReducer