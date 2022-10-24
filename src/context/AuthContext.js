import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer"


const INITIAL_STATE = {
    user:{_id: '634ce7b7bbbc9f416c12067b', username: 'john', email: 'john@gmail.com', 
    password: '$2b$10$txqZeoQxqXm87rjIzxw8jubf4iwyV1Xl1hTzMO2l750FqnTymi..y', profilePicture: 'p2.jpg',
    followings:["634cdd204eb4f4c8bc8d3833","6352961f65d8d599eb6a01f2"],
    followers:["634cdd204eb4f4c8bc8d3833"]},
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    );
};