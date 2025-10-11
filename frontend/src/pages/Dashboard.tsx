import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../hooks/useSocket';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import KanbanBoard from '../components/KanbanBoard';
import SuperuserModal from '../components/SuperuserModal';
import NewProjectModal from '../components/NewProjectModal';
import NewTicketModal from '../components/NewTicketModal';
import { toggleNewProjectModal, toggleNewTicketModal } from '../redux/uiSlice';
import { RootState } from '../redux/store';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { activeProject } = useSelector((state: RootState) => state.projects);
  const { newProjectModal, newTicketModal } = useSelector((state: RootState) => state.ui);

  useSocket(user?._id, activeProject?._id);

  return (
    <Layout>
      <Sidebar key="sidebar" />
      <div key="main-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Topbar />
        <KanbanBoard activeProject={activeProject} />
      </div>
      <SuperuserModal />
      <NewProjectModal isOpen={newProjectModal} onClose={() => dispatch(toggleNewProjectModal())} />
      <NewTicketModal isOpen={newTicketModal} onClose={() => dispatch(toggleNewTicketModal())} projectId={activeProject?._id} />
    </Layout>
  );
};

export default Dashboard;
