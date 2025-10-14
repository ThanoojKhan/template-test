import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
// import { getCompany } from '../../services/dataManager';
import dummyCompanies from '../../lib/dummyDatas';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Atoms/Pagination';
import CompanyCard from '../Molecules/CompanyCard';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 6;
  const navigate = useNavigate();

  // const fetchCompanies = async (page, query) => {
  //   setLoading(true);
  //   try {
  //     const response = await getCompany(page, query);
  //     const companyData = response?.data?.companies;
  //     const total = response?.data?.total;
  //     if (companyData && Array.isArray(companyData)) {
  //       setCompanies(companyData);
  //     } else {
  //       setCompanies([]);
  //     }
  //     setTotalCompanies(total);
  //   } catch (err) {
  //     setError(err?.message || 'An error occurred while fetching companies.');
  //     toast.error(err?.message || 'Failed to fetch companies');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // Fetch companies (dummy version)
  const fetchCompanies = async (page, query) => {
    setLoading(true);
    try {
      let filtered = dummyCompanies;
      if (query) {
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.location.toLowerCase().includes(query.toLowerCase())
        );
      }

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      setCompanies(paginated);
      setTotalCompanies(filtered.length);
    } catch (err) {
      setError('Error loading dummy companies');
      toast.error('Error loading dummy companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(page, query);
  }, [page, query]);

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full lg:max-w-6xl bg-white p-4 lg:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl lg:text-2xl font-semibold text-center text-indigo-600 mb-6">
            Company List
          </h2>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by name or location"
              className="w-full lg:w-1/3 p-2 border border-gray-300 rounded-lg"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading companies...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : companies.length === 0 ? (
            <div className="text-center text-gray-500">No companies available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))}
            </div>
          )}

          <Pagination
            totalItems={totalCompanies}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}

export default CompanyList;