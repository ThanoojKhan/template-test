import dummyCompanies from "../lib/dummyDatas";

/**
 * @param {string} email 
 * @returns {string[]|null} 
 */
export function getCompanyIdsByEmail(email) {
    if (!email || !email.includes('@')) return null;

    const domain = email.split('@')[1].trim().toLowerCase();
    let matchedCompanies = [];

    if (domain.includes('thrifty')) {
        matchedCompanies = dummyCompanies.filter(
            (c) =>
                c.name.toLowerCase().includes('thrifty') &&
                c.location.toLowerCase().includes('uae')
        );
    }

    else if (domain.includes('dollar')) {
        if (domain.endsWith('.ae')) {
            matchedCompanies = dummyCompanies.filter(
                (c) =>
                    c.name.toLowerCase().includes('dollar') &&
                    c.location.toLowerCase().includes('uae')
            );
        } else if (domain.endsWith('.com')) {
            matchedCompanies = dummyCompanies.filter(
                (c) =>
                    c.name.toLowerCase().includes('dollar') &&
                    c.location.toLowerCase().includes('oman')
            );
        } else {
            matchedCompanies = dummyCompanies.filter((c) =>
                c.name.toLowerCase().includes('dollar')
            );
        }
    }

    if (matchedCompanies.length === 0) {
        const exactMatch = dummyCompanies.find(
            (c) => c.email.toLowerCase() === email.toLowerCase()
        );
        if (exactMatch) matchedCompanies = [exactMatch];
    }

    return matchedCompanies.length > 0 ? matchedCompanies.map((c) => c._id) : null;
}
