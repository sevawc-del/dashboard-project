import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ data, fileName = "Export", columns }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    // Format data with Serial Number
    const formattedData = data.map((item, index) => {
      const row = {};

      // Add Serial Number column
      row["S.No"] = index + 1;

      columns.forEach((col) => {
        if (col.key) {
          let value = item[col.key];

          // Auto format date fields
          if (value && col.key.toLowerCase().includes("date")) {
            value = new Date(value).toLocaleDateString();
          }

          row[col.header] = value ?? "";
        }
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // ✅ Auto column width calculation
    const columnWidths = Object.keys(formattedData[0]).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...formattedData.map((row) =>
          row[key] ? row[key].toString().length : 0
        )
      );
      return { wch: maxLength + 2 }; // +2 for padding
    });

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
