import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios"; //! Sirve para hacer peticiones a un servidor remoto entre otras operaciones

// import signinImage from '../assets/signup.jpg'; //! Imagen de fondo

const cookies = new Cookies();

const initialState = { 
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, phoneNumber, avatarURL } = form;
        
        const URL = 'http://localhost:5000/auth'; //! URL del servidor

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });
        //! Guardar el token en el navegador
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        //! Si el usuario no se registro, se le redirecciona a la pagina de registro
        if(isSignup) {
          cookies.set('phoneNumber', phoneNumber);
          cookies.set('avatarURL', avatarURL);
          cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload(); //! Recarga la pagina
    }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Registrase" : "Iniciar sesión"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Nombre</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Nombre completo"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Telefono</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Numero de telefono"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Contraseña</label>
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirma tu contraseña</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
                <button>{isSignup ? "Registrarse" : "Iniciar sesion"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
              <span onClick={switchMode}>
                {isSignup ? "Iniciar sesion" : "Registrarse"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        {/* <img src={signinImage} alt="sign in" /> */}
      </div>
    </div>
  );
};

export default Auth;
