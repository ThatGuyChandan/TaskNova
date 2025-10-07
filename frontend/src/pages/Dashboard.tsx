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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activeProject } = useSelector((state) => state.projects);
  const { newProjectModal, newTicketModal } = useSelector((state) => state.ui);

  useSocket(user?.id, activeProject?.id);

  return (
    <Layout>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Topbar />
        <KanbanBoard />
      </div>
      <SuperuserModal />
      <NewProjectModal isOpen={newProjectModal} onClose={() => dispatch(toggleNewProjectModal())} />
      <NewTicketModal isOpen={newTicketModal} onClose={() => dispatch(toggleNewTicketModal())} projectId={activeProject?.id} />
    </Layout>
  );
};

export default Dashboard;
