import React, {useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import ExportToExcel from "../components/ExportToExcel";


import { 
  createSeedDistribution,
  getSeedDistributions,
  updateSeedDistribution,
  deleteSeedDistribution
} from '../utils/api';



const SeedDistribution = () => {

  const [submissions, setSubmissions] = useState([]);
const [editing, setEditing] = useState(null);

  const initialState = {
    panchayat: '',
    revenueVillage: '',
    crpName: '',
    tolaNameWardNo: '',
    farmerName: '',
    fatherHusbandName: '',
    mobileNumber: '',
    aadharNumber: '',
    maizeSeedPacket: '',
    zincSulphate: '',
    atrazine: '',
    oorja: '',
    gypsum: '',
    sowingDate: '',
    expectedHarvestingDate: '',
    intercrop: '',
    silage: ''
  };

  const fetchSubmissions = async () => {
  try {
    const res = await getSeedDistributions();
    setSubmissions(res.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchSubmissions();
}, []);

  const revenueVillageOptions = [
  "Balaitha","Pirnagar","Muras","Kanjari","Telihar","Bela Noabad",
  "Kurvan","Pachaut- Balaitha","Dhaadi","Mali","Beera","Itmadi",
  "Gawaas","Dumari","Dudarja","Pachaat","Chodhali"
];

const panchayatOptions = [
    "Balaitha",
    "Pirnagar",
    "Bela Noabad",
    "Kanjari",
    "Telihar",
    "Kurvan",
    "Mali",
    "Itmadi",
    "Dumari",
    "Chodhali"
  ];


  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editing) {
      await updateSeedDistribution(editing._id, formData);
    } else {
      await createSeedDistribution(formData);
    }

    alert("Saved successfully!");
    setFormData(initialState);
    setEditing(null);
    fetchSubmissions();

  } catch (error) {
    console.error(error);
    alert("Error saving data");
  }
};

const handleEdit = (item) => {
  setFormData(item);
  setEditing(item);
};

const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this slider?')) return;

  try {
    await deleteSeedDistribution(id);
    fetchSubmissions();
  } catch (error) {
    console.error('Failed to delete slider:', error);
      alert('Failed to delete slider');
  }
};


const columns = [
  { header: "Panchayat", key: "panchayat" },
  { header: "Revenue Village", key: "revenueVillage" },
  { header: "Tola & Ward", key: "tolaNameWardNo" },
  { header: "CRP Name", key: "crpName" },
  { header: "Farmer Name", key: "farmerName" },
  { header: "Father/Husband", key: "fatherHusbandName" },
  { header: "Mobile", key: "mobileNumber" },
  { header: "Aadhar", key: "aadharNumber" },

  { header: "Maize Seed Packet", key: "maizeSeedPacket" },
  { header: "Zinc Sulphate (kg)", key: "zincSulphate" },
  { header: "Atrazine (g)", key: "atrazine" },
  { header: "Oorja (kg)", key: "oorja" },
  { header: "Gypsum (kg)", key: "gypsum" },

  {
    header: "Sowing Date",
    key: "sowingDate",
    render: (item) =>
      item.sowingDate
        ? new Date(item.sowingDate).toLocaleDateString()
        : "-"
  },
  {
    header: "Harvest Date",
    key: "expectedHarvestingDate",
    render: (item) =>
      item.expectedHarvestingDate
        ? new Date(item.expectedHarvestingDate).toLocaleDateString()
        : "-"
  },

  { header: "Intercrop", key: "intercrop" },
  { header: "Silage", key: "silage" }
];




  const inputClasses =
    "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const requiredStar = <span className="text-red-500">*</span>;

  return (
    <div className="p-3 sm:p-6 bg-gray-100 min-h-screen overflow-x-hidden">

      <div className="w-full bg-white p-4 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 border-b pb-4">
          Seed Distribution Form
        </h1>

       <form onSubmit={handleSubmit} className="space-y-10">


          {/* 1️⃣ Location Details */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-blue-700">
              1. Location Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className={labelClasses}>
                  Panchayat {requiredStar}
                </label>
                <select
                  name="panchayat" value={formData.panchayat} onChange={handleChange} className={inputClasses} required>
                  <option value="">Select Panchayat</option>
                  {panchayatOptions.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  Revenue Village {requiredStar}
                </label>
                
                <select name="revenueVillage" value={formData.revenueVillage} onChange={handleChange} className={inputClasses} required>
                   <option value="">Select Revenue Village</option>
                         {revenueVillageOptions.map(village => (
                          <option key={village} value={village}>{village}</option>
                                                     ))}
</select>
              </div>

              <div>
                <label className={labelClasses}>
                  Tola Name & Ward No. {requiredStar}
                </label>
                <input
                  type="text"
                  name="tolaNameWardNo"
                  value={formData.tolaNameWardNo}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </div>

          {/* 2️⃣ CRP & Farmer Details */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-blue-700">
              2. CRP & Farmer Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className={labelClasses}>
                  CRP Name {requiredStar}
                </label>
                <input
                  type="text"
                  name="crpName"
                  value={formData.crpName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Farmer Name {requiredStar}
                </label>
                <input
                  type="text"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Father/Husband Name {requiredStar}
                </label>
                <input
                  type="text"
                  name="fatherHusbandName"
                  value={formData.fatherHusbandName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Mobile Number {requiredStar}
                </label>
                <input
                  type="number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Aadhar Number {requiredStar}
                </label>
                <input
                  type="number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </div>

          {/* 3️⃣ Seed & Fertilizer Details */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-blue-700">
              3. Seed & Fertilizer Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input type="text" name="maizeSeedPacket" placeholder="Maize Seed category 2 Packet (8Kg/acre)" value={formData.maizeSeedPacket} onChange={handleChange} className={inputClasses} />
              <input type="number" name="zincSulphate" placeholder="Zinc Sulphate (kg)" value={formData.zincSulphate} onChange={handleChange} className={inputClasses} />
              <input type="number" name="atrazine" placeholder="Atrazine (Herbicide in gram)" value={formData.atrazine} onChange={handleChange} className={inputClasses} />
              <input type="number" name="oorja" placeholder="Oorja (Biofertilizer in kg)" value={formData.oorja} onChange={handleChange} className={inputClasses} />
              <input type="number" name="gypsum" placeholder="Gypsum (Zypmite in kg)" value={formData.gypsum} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          {/* 4️⃣ Date & Cropping Details */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-blue-700">
              4. Date & Cropping Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input type="date" name="sowingDate" value={formData.sowingDate} onChange={handleChange} className={inputClasses} />
              <input type="date" name="expectedHarvestingDate" value={formData.expectedHarvestingDate} onChange={handleChange} className={inputClasses} />

              <select name="intercrop" value={formData.intercrop} onChange={handleChange} className={inputClasses}>
                <option value="">Intercrop Y/N</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <select name="silage" value={formData.silage} onChange={handleChange} className={inputClasses}>
                <option value="">Silage Y/N</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => setFormData(initialState)}
              className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

        </form>
        <div className="flex justify-start sm:justify-end mt-4">
      <ExportToExcel
    data={submissions}
    columns={columns}
    fileName="Seed_Distribution"
  />
</div>
 </div>


 <div className="w-full mt-6">
  <div className="md:hidden space-y-3">
    {submissions.map((item) => (
      <div key={item._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="space-y-2 text-sm text-gray-700">
          {columns.map((col) => (
            <div key={col.key}>
              <span className="font-semibold">{col.header}: </span>
              <span>
                {col.render
                  ? col.render(item)
                  : item[col.key] || "-"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="hidden md:block overflow-x-auto shadow rounded-lg border border-gray-200 mt-4">
    <div className="min-w-max">
      <DataTable
        data={submissions}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  </div>
</div>


    </div>
  );
};

export default SeedDistribution;
