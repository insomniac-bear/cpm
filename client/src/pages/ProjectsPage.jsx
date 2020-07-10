import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.js';
import { useMessage } from '../hooks/message.hook.js';
import { AuthContext } from '../context/AuthContext.js';
import { Loader } from '../components/Loader.jsx';
import { ProjectList } from '../components/ProjectList.jsx';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);
  const message = useMessage();

  const fetchProjects = useCallback(async () => {
    try {
      const fetched = await request(`/api/project`, `GET`, null, {
        Authorization: `Bearer ${ token }`
      });
      setProjects(fetched);
    } catch (e) {};
  }, [token, request]);

  const deleteHandler = async (id) => {
    const deletedProject = await request(`/api/project/${ id }`, `DELETE`, null, {
      Authorization: `Bearer ${ token }`
    });
      message(deletedProject.message);
      fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return <Loader />
  }

  return <React.Fragment>
    { !loading && <ProjectList projects={projects} deleteHandler={deleteHandler} />}
  </React.Fragment>
};
