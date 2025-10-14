
const DetailItem = ({ label, value }) => {
  return (
    <p className="text-sm text-gray-700">
      <strong>{label}:</strong> {value || "—"}
    </p>
  );
};

export default DetailItem;
