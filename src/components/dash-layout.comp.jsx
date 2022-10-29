import { Outlet } from 'react-router-dom';

// comp
import DashFooter from './dash-footer.comp';
import DashHeader from './dash-header.comp';

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}
