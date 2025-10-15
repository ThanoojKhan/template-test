import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Home,
    Building2,
    Users,
    Settings,
    Menu,
    ArrowLeft,
} from "lucide-react";
import dummyCompanies from "../../lib/dummyDatas";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const savedIds = localStorage.getItem("selectedCompanyId");
        const selectedIds = savedIds ? JSON.parse(savedIds) : [];

        const filtered = dummyCompanies.filter((c) =>
            selectedIds.includes(c._id)
        );

        setCompanies(filtered);

        if (filtered.length > 0) {
            setSelectedCompany(filtered[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedCompany) {
            localStorage.setItem(
                "selectedCompany",
                JSON.stringify(selectedCompany)
            );
        }
    }, [selectedCompany]);

    const menus = [
        { name: "Dashboard", icon: <Home size={20} />, path: "/" },
        {
            name: "Current Company Details",
            icon: <Building2 size={20} />,
            path: `/company/${selectedCompany?._id || ""}`,
        },
        { name: "Users", icon: <Users size={20} />, path: "/users" },
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    ];

    return (
        <div
            className={`${open ? "w-64" : "w-20"
                } bg-gray-900 text-gray-100 h-screen rounded-lg shadow-lg transition-all duration-300 flex flex-col`}
        >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                <h2
                    className={`text-lg font-semibold transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0"
                        }`}
                >
                    Side bar sample
                </h2>
                <button onClick={() => setOpen(!open)} className="text-gray-300">
                    {open ? <ArrowLeft size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <div className="px-4 py-4 border-b border-gray-700">
                <select
                    className={`bg-gray-800 text-gray-200 text-sm w-full rounded-lg p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300 ${open ? "opacity-100" : "opacity-100 w-0"
                        }`}
                    value={selectedCompany?._id || ""}
                    onChange={(e) => {
                        const company = companies.find(
                            (c) => c._id === e.target.value
                        );
                        setSelectedCompany(company);
                    }}
                >
                    <option value="">Select a company</option>
                    {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                            {company.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1 mt-4">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.name}
                        to={menu.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer transition-colors duration-200 
              ${isActive
                                ? "bg-indigo-600 text-white"
                                : "text-gray-300 hover:bg-gray-800"
                            }`
                        }
                    >
                        {menu.icon}
                        <span
                            className={`text-sm font-medium transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0"
                                }`}
                        >
                            {menu.name}
                        </span>
                    </NavLink>
                ))}
            </div>

            <div
                className={`${open ? "w-64" : "w-20"
                    } px-4 py-3 text-xs text-gray-400 border-t border-gray-700 absolute bottom-0 text-center transition-all duration-300`}
            >
                {open ? <p>Version: {__APP_VERSION__}</p> : <p>{__APP_VERSION__}</p>}
            </div>
        </div>
    );
};

export default Sidebar;