import { FC, useState } from "react";
import { useGettingUser } from "../../hooks/useScroll";
import { useAppDispatch } from "../../redux";
import { login, logout, registration } from "../../serviceAxios/UIActions";
import "./style.scss";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const cleanFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    login(email, password, dispatch);
    cleanFields();
  };

  const handleRegistration = () => {
    registration(email, password, dispatch);
    cleanFields();
  };

  const [user, isLoadingUser] = useGettingUser();

  if (isLoadingUser) {
    return <div>Load data...</div>;
  }

  if (user && user.isActivated) {
    return (
      <div>
        <h2>{`Hi, ${user.email}`}</h2>
        <button onClick={() => logout(dispatch)}>Выйти</button>
      </div>
    );
  }

  return (
    <div className="login">
      <h2>
        {user && !user?.isActivated
          ? "Confirm registration on email"
          : "Register/Login, please"}
      </h2>
      <input
        className="login__input"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="password"
      />
      <div className="login__actions">
        <button onClick={handleLogin}>Логин</button>
        <button onClick={handleRegistration}>Регистрация</button>
      </div>
    </div>
  );
};
export default LoginForm;
