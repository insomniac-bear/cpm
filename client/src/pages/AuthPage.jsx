import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook.js';
import { useMessage } from '../hooks/message.hook.js';
import { AuthContext } from '../context/AuthContext.js';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    login: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {};
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {};
  };

  return <React.Fragment>
      <section className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h2 className="card-title center">Авторизация</h2>
                
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="login"
                      type="text"
                      name="login"
                      value={form.login}
                      onChange={changeHandler}
                    />
                    <label className="white-text" htmlFor="login">Login</label>
                  </div>
   
                  <div className="input-field col s6">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={changeHandler}
                    />
                    <label className="white-text" htmlFor="password">Password</label>
                  </div>
                </div>
  
              </div>
              
              <div className="card-action">
                <button
                  className="btn orange lighten-2 margin-r-1"
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Войти
                </button>
                <button
                  className="btn waves-effect waves-light indigo lighten-2"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  </React.Fragment>
};
