import React from 'react';

export const WorksList = ({ works }) => {
  if (!works.length) {
    return <h3 className="center red-text">Перечень работ не определен. Добавьте работы в проект</h3>;
  }
  return <React.Fragment>
    <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Нааименование работ</th>
              <th>Ед. изм.</th>
              <th>Цена за ед.</th>
              <th>Кол-во</th>
              <th>Цена</th>
          </tr>
        </thead>

        <tbody>
          { works.map( (work, index) => {
            return (
              <tr key={work._id}>
                <td>{index + 1}</td>
                <td>{work.name}</td>
                <td>{work.unit}</td>
                <td>{work.pricePerOne} р.</td>
                <td>{work.count} {work.unit}</td>
                <td>{work.count * work.pricePerOne} р.</td>
              </tr>
            );
          })}
          
        </tbody>
      </table>
  </React.Fragment>
};
