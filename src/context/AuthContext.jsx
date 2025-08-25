import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import conf from '../conf/conf';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUserStatus();
        
    }, []);

    const checkUserStatus = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const session = await authService.login({ email, password });
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return session;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.log("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, name) => {
        setLoading(true);
        try {
            const session = await authService.createAccount({ email, password, name });
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return session;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading,
        checkUserStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 