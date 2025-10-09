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
