import { useEffect, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function useAuthStatus() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true);
			}
			setCheckingStatus(false);
		});
	}, []);
	return { loggedIn, checkingStatus };
}
