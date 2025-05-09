import { Link } from "react-router";
import { BsArrowRight } from "react-icons/bs";

function App() {
  return (
    <div className="grid place-items-center min-h-dvh">
      <Link to="/app/dashboard" className="text-4xl flex items-center gap-2">
        Dashboard <BsArrowRight />
      </Link>
    </div>
  );
}

export default App;
