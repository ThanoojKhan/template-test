import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "../../redux/slices/authSlice";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { authenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const confirmation = confirm("Are you sure you want to logout?");
    if (!confirmation) return;

    dispatch(setAuthenticated(false));
    // await logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="max-h-[80px] h-auto object-contain"
        />
      </div>
      <div className="flex items-center space-x-4">
        {/* {authenticated && ( */}
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </>
        {/* )} */}
      </div>
    </nav>
  );
};

export default Navbar;
