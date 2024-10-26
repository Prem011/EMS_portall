import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("EMS"));

        if (localUser) {
            const { user, expiration } = localUser;
            // Check if the current time is greater than the expiration time
            if (Date.now() > expiration) {
                // If expired, remove from localStorage and set authUser to null
                localStorage.removeItem("EMS");
                setAuthUser(null);
            } else {
                // Set authUser if not expired
                setAuthUser(user);
            }
        }

        // Check cookie if localStorage has no valid user
        const cookieUser = Cookies.get("jwt");
        if (!authUser && cookieUser) {
            // Handle case where user is in cookie but not in localStorage
            setAuthUser(cookieUser); // Update authUser if needed
        }
    }, []);

    const login = (user) => {
        try {
            if (!user || !user.token || !user.username) {
                throw new Error('Invalid user object or missing token/username');
            }
    
            const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
            const userData = { username: user.username, token: user.token, expiration: expirationTime };
    
            setAuthUser(user);
            localStorage.setItem('EMS', JSON.stringify(userData));
            Cookies.set('jwt', user.token, { expires: 1 }); // Keep cookie for 1 day
    
        } catch (error) {
            console.error('Error setting login state:', error);
            // Handle the error (e.g., show a notification to the user)
        }
    };
    
    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem("EMS");
        Cookies.remove("jwt");
    };

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
