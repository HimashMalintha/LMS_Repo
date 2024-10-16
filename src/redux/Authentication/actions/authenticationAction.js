import axios from 'axios';
import { setIsLogged, setRole, setStatus, setUser } from '../slices/authenticationSlice';
import Swal from 'sweetalert2';
import { setQuizTaken } from '../../Quiz/slices/quizSlice';



  export const registerUser = (userName, email, password) => {
    return async (dispatch, getState) => {

        try {
            const { backend } = getState().authentication;
            const response = await axios.post(`${backend}/api/signUp`, {
                userName: userName,
                email: email,
                password: password
            });

            



            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Account Created Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            return Promise.resolve();

        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error case
            Swal.fire({
                icon: 'error',
                title: 'Registeration Failed',
                text: 'Error Occured',
            });
            return Promise.reject(error);
        }
    };
};

export const loginUser = (username, password) => {
    return async (dispatch, getState) => {

        try {
            const { backend } = getState().authentication;
            const response = await axios.post(`${backend}/api/login`, {
                email: username,
                password: password
            });

            localStorage.setItem("token", response.data.refreshToken);
            localStorage.setItem("username", response.data.username);

            dispatch(setUser(response.data.username));
            dispatch(setRole(response.data.role));
            dispatch(setQuizTaken(response.data.quizTaken));
            console.log("dispaatch", response.data.quizTaken)

            const { role } = getState().authentication;
            console.log("Role is:", role)
            dispatch(setIsLogged(true));



            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Logged in Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            return Promise.resolve();

        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error case
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password',
            });
            return Promise.reject(error);
        }
    };
};
export const checkLogin = (token) => {
    return async (dispatch, getState) => {
        try {
            console.log("Token:", token);

            const { backend } = getState().authentication;
            console.log("error free")
            const response = await axios.post(`${backend}/api/checkStatus`, {
                refreshToken: token,
            });

            console.log("Error is:", response.data.error);

            if (response.data.error === false) {
                dispatch(setRole(response.data.role));
                dispatch(setUser(response.data.user));
                dispatch(setIsLogged(true));
                dispatch(setStatus(true));
                dispatch(setQuizTaken(response.data.quizTaken))
                console.log("dispaatch", response.data.quizTaken)

                console.log("Login success")
            } else {
                dispatch(setIsLogged(false));
                dispatch(setStatus(false));
            }
        } catch (error) {
            console.error('Error checking login:', error);
            dispatch(setIsLogged(false));
            dispatch(setStatus(false));
        }
    };
};



export const redirectLogout = () => {
    return async (dispatch, getState) => {
        try {
            console.log("logout")
            const { backend } = getState().authentication;
            await fetch(`${backend}/api/refreshToken`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refreshToken: localStorage.getItem("token"),
                })
            }).then((res) => {
                if (res.ok) {
                    localStorage.setItem("token", "");
                    localStorage.setItem("username", "");
                    console.log("logged out successfully");
                    window.location.reload(false);
                    dispatch(setStatus(false));
                } else {
                    console.log("Cannot logout");
                }
            });
            localStorage.removeItem("isLogged");
        } catch (error) {
            console.error(error.message);
        }
    };
};

