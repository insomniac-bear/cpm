import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectList = ({ projects, deleteHandler }) => {
  if (!projects.length) {
    return <p className="center">Проектов пока нет</p>
  }
  return <React.Fragment>
    <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Название проекта</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          { projects.map( (project, index) => {
            return (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td><Link to={`/detail/${ project._id }`}>{project.name}</Link></td>
                <td>{new Date(project.dateStart).toLocaleDateString()}</td>
                <td>{new Date(project.dateEnd).toLocaleDateString()}</td>
                <td>
                  <button
                    className="deep-purple lighteen-1 waves-effect waves-light btn"
                    onClick={() => deleteHandler(project._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
          
        </tbody>
      </table>
  </React.Fragment>
};
