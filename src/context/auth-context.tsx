import { SplashScreen } from "expo-router";
import { createContext, useEffect, useReducer, useState } from "react";
import { authLogin } from "src/api-functions/auth/auth-login";
import { decode } from "src/utils/jwt";
import { boolean } from "yup";

interface IAuthInitialState {
	isAuthenticated: boolean;
	isInitialized: boolean;
	user: object | null;
}

const actions = {
	INITIALIZE: "INITIALIZE",
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	LOGOUT: "LOGOUT",
};

const initialState: IAuthInitialState = {
	isAuthenticated: true,
	isInitialized: true,
	user: null,
};

const handlers = {
	INITIALIZE: (state, action) => {
		const { isAuthenticated, user } = action.payload;

		return {
			...state,
			isAuthenticated,
			isInitialized: true,
			user,
		};
	},
	LOGIN: (state, action) => {
		const { user } = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
	LOGOUT: (state) => ({
		...state,
		isAuthenticated: false,
		user: null,
	}),
	REGISTER: (state, action) => {
		const { user } = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
	...initialState,
	loading: boolean,
	login: (phone: string, code: string) => Promise.resolve(),
	loginConfirm: () => Promise.resolve(),
	logout: () => Promise.resolve(),
	register: () => Promise.resolve(),
	registerConfirm: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loader = async () => {
			await new Promise((resolve) => setTimeout(resolve, 50));
			await SplashScreen.hideAsync();
			setLoading(false);
		};

		loader();
	}, []);

	// const initialize = async () => {
	// 	const refresh_token = globalThis.localStorage.getItem("refreshToken");

	// 	try {
	// 		if (refresh_token) {
	// 			const { access_token } = await authRefresh(refresh_token);
	// 			const user = decode(access_token);

	// 			dispatch({
	// 				type: actions.INITIALIZE,
	// 				payload: {
	// 					isAuthenticated: true,
	// 					user: {
	// 						...user,
	// 						access_token,
	// 					},
	// 				},
	// 			});
	// 		} else {
	// 			dispatch({
	// 				type: actions.INITIALIZE,
	// 				payload: {
	// 					isAuthenticated: false,
	// 					user: null,
	// 				},
	// 			});
	// 		}
	// 	} catch (err) {
	// 		dispatch({
	// 			type: actions.INITIALIZE,
	// 			payload: {
	// 				isAuthenticated: false,
	// 				user: null,
	// 			},
	// 		});
	// 	}
	// };
	const login = async (login, password) => {
		const { access_token, refresh_token } = await authLogin({
			login,
			password,
		});

		const user = decode(access_token);
		localStorage.setItem("refreshToken", refresh_token);
		dispatch({
			type: actions.LOGIN,
			payload: {
				user: {
					...user,
					access_token,
				},
			},
		});
		return user;
	};

	// const logout = async () => {
	//     localStorage.removeItem("refreshToken");
	//     dispatch({type: actions.LOGOUT});
	// }
	// const register = async (name, phone, password) => {
	//     return  await authRegister({name, phone, password});
	// }

	// const registerConfirm = async (phone, code) => {
	//     const {
	//         access_token,
	//         refresh_token
	//     } = await authRegisterConfirm({phone, code})

	//     const user = decode(access_token);

	//     localStorage.setItem("refreshToken", refresh_token);

	//     dispatch({
	//         type: actions.REGISTER,
	//         payload: {
	//             user: {
	//                 ...user,
	//                 access_token
	//             }
	//         }
	//     })
	// }

	// useEffect(() => {
	//     initialize().catch(console.error)
	// }, [])

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				loading,
				// register,
				// registerConfirm,
				// logout
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthConsumer = AuthContext.Consumer;
