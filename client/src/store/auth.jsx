import { createContext, useContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);
  const [services, setServices] = useState([]);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = !!token;
  console.log("isLoggedIn:", isLoggedIn);

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    setServices([]);
    
    
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${window.location.origin}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        setUser(data.message); // Assuming the user data is in data.message
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error("Failed to fetch user data");
      }
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Services data:", data);
        setServices(data); // Assuming the services data is the response itself
      } else {
        console.error("Failed to fetch services data");
      }
    } catch (err) {
      console.error("Error fetching services data", err);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
      getServices();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, token, user, services, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
