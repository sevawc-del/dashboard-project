// import React, { useEffect, useState } from 'react';
// import DataTable from '../components/DataTable';
// import {
//   getSeedDistributions,
//   createSeedDistribution,
//   updateSeedDistribution,
//   deleteSeedDistribution
// } from '../utils/api';

// const defaultFormState = {
//   panchayat: '',
//   revenueVillage: '',
//   crpName: '',
//   tolaNameWardNo: '',
//   farmerName: '',
//   fatherHusbandName: '',
//   mobileNumber: '',
//   aadharNumber: '',
//   maizeSeedPacket: '',
//   zincSulphate: '',
//   atrazine: '',
//   oorja: '',
//   gypsum: '',
//   sowingDate: '',
//   expectedHarvestingDate: '',
//   intercrop: '',
//   silage: ''
// };

// const SeedDistribution = () => {
//   const [records, setRecords] = useState([]);
//   const [formData, setFormData] = useState(defaultFormState);
//   const [editing, setEditing] = useState(null);

//   const fetchRecords = async () => {
//     try {
//       const res = await getSeedDistributions();
//       setRecords(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = [
//       'panchayat',
//       'revenueVillage',
//       'crpName',
//       'tolaNameWardNo',
//       'farmerName',
//       'fatherHusbandName',
//       'mobileNumber',
//       'aadharNumber'
//     ];

//     const missing = requiredFields.filter(field => !formData[field]);

//     if (missing.length > 0) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       if (editing) {
//         await updateSeedDistribution(editing._id, formData);
//       } else {
//         await createSeedDistribution(formData);
//       }

//       setFormData(defaultFormState);
//       setEditing(null);
//       fetchRecords();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       ...item,
//       sowingDate: item.sowingDate ? item.sowingDate.split('T')[0] : '',
//       expectedHarvestingDate: item.expectedHarvestingDate
//         ? item.expectedHarvestingDate.split('T')[0]
//         : ''
//     });
//     setEditing(item);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteSeedDistribution(id);
//       fetchRecords();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const columns = [
//     { header: 'Panchayat', key: 'panchayat' },
//     { header: 'Revenue Village', key: 'revenueVillage' },
//     { header: 'Farmer Name', key: 'farmerName' },
//     { header: 'Mobile', key: 'mobileNumber' },
//     { header: 'Maize Packet', key: 'maizeSeedPacket' },
//     {
//       header: 'Sowing Date',
//       key: 'sowingDate',
//       render: (item) =>
//         item.sowingDate
//           ? new Date(item.sowingDate).toLocaleDateString()
//           : '-'
//     }
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Seed Distribution</h1>

//       <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           <select name="panchayat" value={formData.panchayat} onChange={handleChange} className="p-2 border rounded" required>
//             <option value="">Select Panchayat</option>
//             <option value="Balaitha">Balaitha</option>
//             <option value="Kachhawa">Kachhawa</option>
//           </select>

//           <select name="revenueVillage" value={formData.revenueVillage} onChange={handleChange} className="p-2 border rounded" required>
//             <option value="">Select Revenue Village</option>
//             <option value="Balaitha">Balaitha</option>
//             <option value="Kachhawa">Kachhawa</option>
//           </select>

//           <input type="text" name="crpName" placeholder="CRP NAME" value={formData.crpName} onChange={handleChange} className="p-2 border rounded" required />

//           <input type="text" name="tolaNameWardNo" placeholder="Tola name & Ward no." value={formData.tolaNameWardNo} onChange={handleChange} className="p-2 border rounded" required />

//           <input type="text" name="farmerName" placeholder="Farmer Name" value={formData.farmerName} onChange={handleChange} className="p-2 border rounded" required />

//           <input type="text" name="fatherHusbandName" placeholder="Father/Husband's Name" value={formData.fatherHusbandName} onChange={handleChange} className="p-2 border rounded" required />

//           <input type="number" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className="p-2 border rounded" required />

//           <input type="number" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} className="p-2 border rounded" required />

//           <input type="number" name="maizeSeedPacket" placeholder="Maize Seed 2 Packet (8Kg/acre)" value={formData.maizeSeedPacket} onChange={handleChange} className="p-2 border rounded" />

//           <input type="number" name="zincSulphate" placeholder="Zink Sulphate (kg)" value={formData.zincSulphate} onChange={handleChange} className="p-2 border rounded" />

//           <input type="number" name="atrazine" placeholder="Atrazine (Herbicide in gram)" value={formData.atrazine} onChange={handleChange} className="p-2 border rounded" />

//           <input type="number" name="oorja" placeholder="Oorja (Biofertilizer in kg)" value={formData.oorja} onChange={handleChange} className="p-2 border rounded" />

//           <input type="number" name="gypsum" placeholder="Gypsum (Zypmite in kg)" value={formData.gypsum} onChange={handleChange} className="p-2 border rounded" />

//           <input type="date" name="sowingDate" value={formData.sowingDate} onChange={handleChange} className="p-2 border rounded" />

//           <input type="date" name="expectedHarvestingDate" value={formData.expectedHarvestingDate} onChange={handleChange} className="p-2 border rounded" />

//           <select name="intercrop" value={formData.intercrop} onChange={handleChange} className="p-2 border rounded">
//             <option value="">Intercrop Y/N</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>

//           <select name="silage" value={formData.silage} onChange={handleChange} className="p-2 border rounded">
//             <option value="">Silage Y/N</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>

//         </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//           {editing ? 'Update' : 'Add'} Record
//         </button>

//         {editing && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditing(null);
//               setFormData(defaultFormState);
//             }}
//             className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       <DataTable
//         data={records}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default SeedDistribution;


import React, { useState } from 'react';
import { createSeedDistribution } from '../utils/api';


const SeedDistribution = () => {
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

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();  // STOP page reload

  try {
    await createSeedDistribution(formData);
    alert("Saved successfully!");
    setFormData(initialState);
  } catch (error) {
    console.error(error);
    alert("Error saving data");
  }
};


  const inputClasses =
    "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const requiredStar = <span className="text-red-500">*</span>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
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
                <select name="panchayat" value={formData.panchayat} onChange={handleChange} className={inputClasses} required>
                  <option value="">Select Panchayat</option>
                  <option value="balaitha">Balaitha</option>
                  <option value="kachhawa">Kachhawa</option>
                  <option value="maheshpur">Maheshpur</option>
                  <option value="sahja">Sahja</option>
                  <option value="parsouni">Parsouni</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  Revenue Village {requiredStar}
                </label>
                <select name="revenueVillage" value={formData.revenueVillage} onChange={handleChange} className={inputClasses} required>
                  <option value="">Select Revenue Village</option>
                  <option value="balaitha">Balaitha</option>
                  <option value="kachhawa">Kachhawa</option>
                  <option value="maheshpur">Maheshpur</option>
                  <option value="sahja">Sahja</option>
                  <option value="parsouni">Parsouni</option>
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
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => setFormData(initialState)}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SeedDistribution;
