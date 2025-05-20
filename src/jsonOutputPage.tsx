import React, { useEffect, useState } from "react";

interface Field {
  RowId: number;
  Value: any;
  Value2: string;
}

const JsonOutputPage: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("webformData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const dataArray = Array.isArray(parsed) ? parsed : parsed.data;
        const simplified = dataArray.map((item: any) => ({
          RowId: item.RowId,
          Value: item.Value,
          Value2: item.Value2,
        }));
        setFields(simplified);
      } catch (err) {
        console.error("Error parsing data from localStorage", err);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Submitted Data Summary</h2>

      {fields.length === 0 ? (
        <p className="text-gray-600">No data available.</p>
      ) : (
        <table className="w-full border border-gray-300 shadow-sm text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-4 py-2">Row ID</th>
              <th className="border px-4 py-2">Value</th>
              <th className="border px-4 py-2">Frequency (Value2)</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.RowId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{field.RowId}</td>
                <td className="border px-4 py-2">{field.Value || "-"}</td>
                <td className="border px-4 py-2">{field.Value2 || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JsonOutputPage;
