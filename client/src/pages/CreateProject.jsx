import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook.js';
import { AuthContext } from '../context/AuthContext.js';
import { useHistory } from 'react-router-dom';

export const CreateProjectPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    startDate: undefined,
    endDate: undefined,
    location: ''
  });
  const { request } = useHttp();

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await request(`/api/project/generate`, 'POST', form, {
        Authorization: `Bearer ${ auth.token }`
      });
      history.push(`/detail/${ data.project._id }`);
    } catch (e) {}
  };

  return <React.Fragment>
    <div className="container">
      <div className="row">
        <form action="POST" className="col s12">
          <div className="row">
            <div className="input-field col s6" >
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={changeHandler}
                required
              />
              <label htmlFor="name">Название проекта</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s2" >
              <input
                id="dateStart"
                type="date"
                name="dateStart"
                value={form.startDate}
                onChange={changeHandler}
              />
              <label htmlFor="dateStart">Дата начала</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s2" >
              <input
                id="dateEnd"
                type="date"
                name="dateEnd"
                value={form.endDate}
                onChange={changeHandler}
              />
              <label htmlFor="dateEnd">Дата окончания</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6" >
              <input
                id="location"
                type="text"
                name="location"
                value={form.location}
                onChange={changeHandler}
              />
              <label htmlFor="location">Расположение</label>
            </div>
          </div>
          <button
            className="deep-purple lighteen-1 waves-effect waves-light btn"
            type="submit"
            onClick={submitHandler}
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  </React.Fragment>
};
