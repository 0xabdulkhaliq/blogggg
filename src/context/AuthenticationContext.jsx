import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = (action, username, password) => {
    return fetch(`http://localhost:3000/user/${action}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setUser(data);
          });
        } else {
          throw response.json();
        }
      })
      .catch((errorData) => {
        throw errorData;
      })
      .finally(() => {
        return new Promise((resolve) => setTimeout(resolve, 500));
      });
  };

  const validateAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/auth", {
        credentials: "include",
      });

      const data = response.ok ? await response.json() : false;

      setUser(data);
    } catch (err) {
      console.error(err);
    }
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    validateAuth().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
