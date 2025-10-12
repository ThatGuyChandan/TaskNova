import React from 'react';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      {/* Sidebar (fixed width) */}
      <div className={styles.sidebar}>
        {/* Sidebar children will be rendered by Sidebar component */}
        {children[0]}
      </div>
      {/* Main content area */}
      <div className={styles.mainContent}>
        {children[1]}
        {/* Modals and overlays come after main content */}
        {children.slice(2)}
      </div>
    </div>
  );
};

export default Layout;
