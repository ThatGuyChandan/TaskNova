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
        <span className={styles.brandName}>Cognito</span>
      </div>
      {/* Search & Settings */}
      <div className={styles.navSection}>
        <button className={styles.navButton}>
          <span role="img" aria-label="search">🔍</span> Search
        </button>
        <button className={styles.navButton}>
          <span role="img" aria-label="settings">⚙️</span> Settings
        </button>
      </div>
      {/* Favorites */}
      <div className={styles.sectionTitle}>
        Favorites
      </div>
      <div className={styles.favoritesList}>
        <div className={styles.favoriteTeam}>Team</div>
        <div className={styles.favoriteProjects}>
          {/* Example static favorite projects */}
          <div className={styles.favoriteProject}>Project 1</div>
          <div className={styles.favoriteProject}>Project 2</div>
        </div>
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