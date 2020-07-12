import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook.js';
import { AuthContext } from '../context/AuthContext.js';

export const WorkCreatorPopup = ({ id, popupClose, getWorks }) => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [workForm, setWorkForm] = useState({
    name: ``,
    dateStart: undefined,
    dateEnd: undefined,
    unit: ``,
    count: ``,
    pricePerOne: ``,
    projectId: id
  });

  const changeHandler = (event) => {
    setWorkForm({ ...workForm, [event.target.name]: event.target.value });
  };

  const submitHandler = async () => {
    try {
      await request(`/api/works/create`, `POST`, workForm, {
        Authorization: `Bearer ${ auth.token }`
      });
      popupClose();
      getWorks();
    } catch (e) {}
  };

  return <React.Fragment>
    <article className="pop-up row">
      <div className="col s6 offset-s3">
        <div className="card  margin-t-20">
          <div className="card-content">
            <span className="card-title">Добавить работы</span>

            <div className="row">
              <div className="input-field col s8">
                <input
                  id="workName"
                  type="text"
                  name="name"
                  value={workForm.name}
                  onChange={changeHandler}
                />
                <label htmlFor="workName">Наименование</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="unit"
                  type="text"
                  name="unit"
                  value={workForm.unit}
                  onChange={changeHandler}
                />
                <label htmlFor="unit">Ед.изм.</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="count"
                  type="text"
                  name="count"
                  value={workForm.count}
                  onChange={changeHandler}
                />
                <label htmlFor="count">Объем работ</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="pricePerOne"
                  type="text"
                  name="pricePerOne"
                  value={workForm.pricePerOne}
                  onChange={changeHandler}
                />
                <label htmlFor="pricePerOne">Цена за ед.</label>
              </div>
            </div>

          </div>
          <footer className="card-action">
            <button
              className="waves-effect waves-light btn deep-purple lighteen-1"
              onClick={submitHandler}
            >
              Сохранить
            </button>
            <button
              className="waves-effect waves-light btn red"
              onClick={popupClose}
            >
              Отмена
            </button>
          </footer>
        </div>
      </div>
    </article>
  </React.Fragment>
};
