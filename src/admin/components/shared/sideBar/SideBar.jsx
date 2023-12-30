import User from '../../ui/user/User';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="scrollbar">
        <User />
      </div>
    </aside>
  );
};

export default SideBar;
