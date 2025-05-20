import React, { useEffect, useState } from "react";

interface Field {
  RowId: number;
  Value: any;
  Value2: string;
}

const JsonOutputPage: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [jsonBlobUrl, setJsonBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("submissionOutput");
    const blobUrl = localStorage.getItem("jsonOutputBlobUrl");

    if (blobUrl) {
      setJsonBlobUrl(blobUrl);
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFields(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error("Error parsing data from localStorage", err);
      }
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Submitted Data</h2>

      {fields.length === 0 ? (
        <p className="text-gray-600">No data available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Table */}
          <div className="overflow-auto border rounded shadow">
            <table className="w-full text-sm border-collapse">
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
          </div>

          {/* Right: JSON display */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">JSON Preview</h3>
              {jsonBlobUrl && (
                <a
                  href={jsonBlobUrl}
                  download="submitted-data.json"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Download JSON
                </a>
              )}
            </div>
            <pre className="bg-gray-100 border rounded p-4 text-xs whitespace-pre-wrap max-h-[500px] overflow-auto">
              {JSON.stringify(fields, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonOutputPage;
