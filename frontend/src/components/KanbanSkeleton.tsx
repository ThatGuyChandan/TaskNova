import React from 'react';
import styles from './KanbanSkeleton.module.css';

const skeletonColumns = [
  { title: 'Proposed', color: 'bg-pink-100 text-pink-600' },
  { title: 'Todo', color: 'bg-purple-100 text-purple-600' },
  { title: 'Inprogress', color: 'bg-cyan-100 text-cyan-600' },
  { title: 'Done', color: 'bg-green-100 text-green-600' },
  { title: 'Deployed', color: 'bg-yellow-100 text-yellow-600' },
];

const KanbanSkeleton = () => {
  return (
    <div className={styles.skeletonBoard}>
      {skeletonColumns.map((col) => (
        <div key={col.title} className={styles.skeletonColumn}>
          <div className={`${styles.skeletonTitle} ${col.color}`}>{col.title}</div>
          <div className={styles.skeletonCardContainer}>
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className={styles.skeletonCard} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanSkeleton;
