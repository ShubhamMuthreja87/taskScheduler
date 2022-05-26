import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { GET_SIGNED_IN_USER } from "../../constants/apiUrls.js";

export const UserContext = createContext({
	loading: true,
	user: null,
	signIn: () => {},
	signOut: () => {},
});

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(true);
	 
	console.log(GET_SIGNED_IN_USER);
	const fetchCurrentUser = async () => {
		try {
			const userData = await axios.get(
				`${GET_SIGNED_IN_USER}`,
				{
					withCredentials: true,
				}
			);
			if (userData.status === 200 && userData.data?.code === "00") {
				setUser({
					...userData.data,
					email: userData.data.email,
					name: userData.data.name,
					phoneNo: userData.data.phoneNo,
				});
				setLoading(false);
			} else {
				setUser(null);
				setLoading(false);
			}
		} catch (err) {
			setUser(null);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchCurrentUser();
	}, []);

	const signIn = (newUser) => {
		setUser(newUser);
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem("isClientLogin");
	};

	return (
		<UserContext.Provider
			value={{
				loading,
				signIn,
				signOut,
				user,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
