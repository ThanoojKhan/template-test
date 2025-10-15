import { useParams, useNavigate } from "react-router-dom";
import dummyCompanies from "../../lib/dummyDatas";
import { useEffect, useState } from "react";
import DetailItem from "../Atoms/DetailItem";

function CompanyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const foundCompany = dummyCompanies.find((c) => c._id === id);
        setCompany(foundCompany);
    }, [id]);

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Company not found!</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-full flex flex-col items-center bg-gray-50 py-10">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {company.logo ? (
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border border-gray-300 shadow-sm"
                        />
                    ) : (
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                            {company.name.charAt(0)}
                        </div>
                    )}

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                            {company.name}
                        </h2>
                        <DetailItem label="Type" value={company.type} />
                        <DetailItem label="Location" value={company.location} />
                        <DetailItem label="Email" value={company.email} />
                        <DetailItem label="Contact" value={company.contactNumber} />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetails;