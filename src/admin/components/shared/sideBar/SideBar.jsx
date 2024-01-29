import User from '../../ui/user/User';

const SideBar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-scrollbar">
        <User />
      </div>
    </aside>
  );
};

export default SideBar;
