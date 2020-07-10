import React, { useState } from 'react';
import { WorkCreatorPopup } from '../components/WorkCreatorPopup.jsx';
import { WorksList } from '../components/WorksList.jsx';

export const ProjectCard = ({ project, works, getWorks }) => {
  const [isPopup, setPopup] = useState(false);

  const popupHandler = () => {
    setPopup(!isPopup); 
  };

  return <React.Fragment>
    <header className="project-card__header">
      <h2 className="center">{ project.name }</h2>
      <p className="margin-l-2">Дата реализации проекта: с { new Date(project.dateStart).toLocaleDateString() } по { new Date(project.dateEnd).toLocaleDateString() }</p>
      <p className="margin-l-2">Местонахождение: { project.location }</p>
    </header>
    <main className="project-card__main">
      <WorksList works={works}/>
      <button
        className="margin-t-20 margin-l-2 btn-floating btn-large waves-effect waves-light deep-purple lighteen-1"
        onClick={popupHandler}
      ><i>+</i>
      </button>
    </main>
    {isPopup && <WorkCreatorPopup id={project._id} popupClose={popupHandler} getWorks={getWorks}/>}
  </React.Fragment>
};
