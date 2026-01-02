import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import { authRequest } from "./api/auth/auth";

function App() {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthChecked = useAuthStore((s) => s.setAuthChecked);

  useEffect(() => {
    authRequest()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked());
  }, [setUser, setAuthChecked]);

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
