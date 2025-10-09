import Board from './Board';
import KanbanSkeleton from './KanbanSkeleton';
import { useSelector } from 'react-redux';

const KanbanBoard = ({ activeProject }) => {
  return (
    <Board key={activeProject?._id} />
  );
};

export default KanbanBoard;
