import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setActiveProject } from '../redux/projectsSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { projects, activeProject } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleProjectClick = (project) => {
    dispatch(setActiveProject(project));
  };

  return (
    <div style={{ width: '16rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0,0, 0.1)' }}>
      <div style={{ padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cognito</h1>
      </div>
      <nav style={{ marginTop: '1.25rem' }}>
        <input
          type="text"
          placeholder="Search"
          style={{ display: 'block', padding: '0.625rem 1rem', borderRadius: '0.25rem', transition: 'all 0.2s', color: '#4a5568', width: '100%' }}
          onChange={(e) => console.log('Search query:', e.target.value)}
        />
        <button
          style={{ display: 'block', padding: '0.625rem 1rem', borderRadius: '0.25rem', transition: 'all 0.2s', color: '#4a5568', width: '100%', textAlign: 'left' }}
          onClick={() => console.log('Settings button clicked')}
        >
          Settings
        </button>
      </nav>
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ paddingLeft: '1rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', color: '#a0aec0' }}>Projects</h2>
        {projects.map((project) => (
          <a
            key={project.id}
            href="#"
            style={{
              display: 'block',
              padding: '0.625rem 1rem',
              borderRadius: '0.25rem',
              transition: 'all 0.2s',
              color: activeProject?.id === project.id ? '#4299e1' : '#4a5568',
              backgroundColor: activeProject?.id === project.id ? '#ebf8ff' : 'transparent',
            }}
            onClick={() => handleProjectClick(project)}
          >
            {project.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
