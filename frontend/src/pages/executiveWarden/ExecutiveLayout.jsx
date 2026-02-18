import { Outlet } from "react-router-dom";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ExecutiveLayout() {
  return (
    <div className="executive-layout">
      
      {/* Sidebar */}
      <ExecutiveSidebar />

      {/* Main Section */}
      <div className="executive-main">

        {/* Topbar */}
        <ExecutiveTopbar />

        {/* Page Content */}
        <div className="executive-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default ExecutiveLayout;
