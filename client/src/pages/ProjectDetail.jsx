import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook.js';
import { AuthContext } from '../context/AuthContext.js';
import { Loader } from '../components/Loader.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx'

export const ProjectDetail = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [project, setProject] = useState(null);
  const [works, setWorks] = useState([]);
  const projectId = useParams().id;

  const getProject = useCallback(async ( ) => {
    try {
      const fetched = await request(`/api/project/${ projectId }`, `GET`, null, {
        Authorization: `Bearer ${ token }`
      });
      setProject(fetched);
    } catch (e) {};
  }, [token, projectId, request]);

    const getWorks = useCallback(async () => {
    try {
      const fetched = await request(`/api/works/${ projectId }`, `GET`, null, {
        Authorization: `Bearer ${ token }`
      });
      setWorks(fetched);
    } catch (e) {}
  }, [token, projectId, request]);


  useEffect(() => {
    getProject();
  }, [getProject]);

  useEffect(() => {
    getWorks();
  }, [getWorks]);

  if (loading) {
    return <Loader />
  };

  return <React.Fragment>
    { !loading && project && <ProjectCard project={project} works={works} getWorks={getWorks}/> }
  </React.Fragment>
};
