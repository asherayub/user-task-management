import { Link } from "react-router-dom";
import { FiHome, FiCalendar, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-max sm:w-64 bg-white shadow-md">
      <div className="p-4 border-b border-gray-200">
        <Link to={"/"} className="text-xl hidden sm:block font-bold text-indigo-600">
          Task Managg
        </Link>
      </div>
      <nav className="p-4">
        <div className="mb-8">
          <p className="text-xs uppercase text-gray-500 font-semibold mb-4">
            Menu
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                to="/app"
                className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <FiHome className="sm:mr-3 w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/app/tasks"
                className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <FiCalendar className="sm:mr-3 w-4 h-4" />
                <span className="hidden sm:inline">My Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/app/settings"
                className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="sm:mr-3 w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
