import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("auth error");
  }
  return (
    <div className="p-2 sm:p-6 flex justify-between items-start w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Settings</h2>
      <button
        onClick={auth.logout}
        className="cursor-pointer px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
