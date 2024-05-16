import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = (action, username, password) => {
    return fetch(`https://blogggg-backend.vercel.app/user/${action}`, {
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
      const response = await fetch(
        "https://blogggg-backend.vercel.app/user/auth",
        {
          credentials: "include",
        }
      );

      const data = response.ok ? await response.json() : false;

      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://blogggg-backend.vercel.app/user/logout",
        {
          credentials: "include",
        }
      );

      if (response.ok) setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
