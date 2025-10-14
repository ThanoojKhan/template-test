import { useNavigate } from "react-router-dom";
import DetailItem from "../Atoms/DetailItem";

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();

    if (!company) return null;

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/company/${company._id}`)}
        >
            {company.logo && (
                <img
                    src={company.logo}
                    alt={company.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
            )}

            <h3 className="text-lg font-semibold text-indigo-600 text-center">
                {company.name}
            </h3>
            <p className="text-sm text-gray-600 text-center">
                {company.location || "Location not provided"}
            </p>

            <div className="mt-3 text-sm text-gray-700 space-y-1">
                <DetailItem label="Type" value={company.type} />
                <DetailItem label="Email" value={company.email} />
                <DetailItem label="Contact" value={company.contactNumber} />
            </div>
        </div>
    );
};

export default CompanyCard;