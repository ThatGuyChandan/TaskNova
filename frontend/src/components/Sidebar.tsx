import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setActiveProject } from '../redux/projectsSlice';
import styles from './Sidebar.module.css';

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
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <span className={styles.brandIcon} />
        <span className={styles.brandName}>FluxBoard</span>
      </div>
      {/* Search & Settings */}
      <div className={styles.navSection}>
        <button className={styles.navButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Search
        </button>
        <button className={styles.navButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v.78a2 2 0 0 1-.67 1.5l-4.24 5.1a2 2 0 0 0-.22 1.84l1.94 6.83a2 2 0 0 0 1.94 1.45h12.8a2 2 0 0 0 1.94-1.45l1.94-6.83a2 2 0 0 0-.22-1.84l-4.24-5.1a2 2 0 0 1-.67-1.5V4a2 2 0 0 0-2-2zm-2.13 9.17a2.5 2.5 0 1 1 0-4.34 2.5 2.5 0 0 1 0 4.34z"></path></svg>
          Settings
        </button>
      </div>
      {/* Projects List */}
      <div className={styles.sectionTitle}>
        Projects
      </div>
      <nav className={styles.projectsNav}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <button
              key={project._id}
              className={`${styles.projectButton} ${activeProject?._id === project._id ? styles.activeProject : styles.inactiveProject}`}
              onClick={() => handleProjectClick(project)}
            >
              {project.name}
            </button>
          ))
        ) : (
          <div className={styles.noProjects}>No projects yet.</div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;