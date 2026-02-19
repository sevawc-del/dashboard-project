import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import ExportToExcel from "../components/ExportToExcel";

import { 
  getChildMarriageCases, 
  createChildMarriageCase, 
  updateChildMarriageCase, 
  deleteChildMarriageCase 
} from '../utils/api';

const ManageChildMarriageCases = () => {
  const [cases, setCases] = useState([]);
  const [imageFileName, setImageFileName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    victimAge: '',
    date: '',
    status: 'pending',
    image: ''
  });
  const [editing, setEditing] = useState(null);

  const fetchCases = async () => {
    try {
      const res = await getChildMarriageCases();
      setCases(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadCases = async () => {
      await fetchCases();
    };
    loadCases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title || '');
      dataToSend.append('description', formData.description || '');
      dataToSend.append('location', formData.location || '');
      dataToSend.append('status', formData.status || 'pending');

      if (formData.victimAge) {
        dataToSend.append('victimAge', parseInt(formData.victimAge, 10));
      }

      if (formData.date) {
        dataToSend.append('date', formData.date);
      }

      if (formData.image) {
        dataToSend.append('image', formData.image);
      }
      
      if (editing) {
        await updateChildMarriageCase(editing._id, dataToSend);
      } else {
        await createChildMarriageCase(dataToSend);
      }
      setFormData({
        title: '',
        description: '',
        location: '',
        victimAge: '',
        date: '',
        status: 'pending',
        image: ''
      });
      setImageFileName('');
      setEditing(null);
      fetchCases();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      location: item.location || '',
      victimAge: item.victimAge || '',
      date: item.date ? item.date.split('T')[0] : '',
      status: item.status || 'pending',
      image: item.image || ''
    });
    setImageFileName('');
    setEditing(item);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleDelete = async (id) => {
     if (!window.confirm('Are you sure you want to delete this slider?')) return;
    try {
      await deleteChildMarriageCase(id);
      fetchCases();
    } catch (error) {
       console.error('Failed to delete slider:', error);
      alert('Failed to delete slider');
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'investigating':
        return 'bg-blue-200 text-blue-800';
      case 'resolved':
        return 'bg-green-200 text-green-800';
      case 'closed':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Location', key: 'location' },
    { header: 'Victim Age', key: 'victimAge' },
    { 
      header: 'Status', 
      key: 'status',
      render: (item) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      )
    },
    { header: 'Date', key: 'date', render: (item) => item.date ? new Date(item.date).toLocaleDateString() : '-' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Child Marriage Cases</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Victim Age"
            value={formData.victimAge}
            onChange={(e) => setFormData({ ...formData, victimAge: e.target.value })}
            className="w-full p-2 border rounded"
            min="0"
            max="18"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Image URL"
                value={typeof formData.image === 'string' ? formData.image : ''}
                onChange={(e) => {
                  setFormData({ ...formData, image: e.target.value });
                  setImageFileName('');
                }}
                className="w-full p-2 pr-28 border rounded"
              />
              <label className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer hover:bg-gray-300 text-sm whitespace-nowrap">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-sm text-gray-600 mt-1 block truncate">
              {imageFileName || 'No file selected'}
            </span>
          </div>
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded mt-4"
          rows="4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
          {editing ? 'Update' : 'Add'} Case
        </button>
        {editing && (
          <button 
            type="button" 
            onClick={() => {
              setEditing(null);
              setFormData({
                title: '',
                description: '',
                location: '',
                victimAge: '',
                date: '',
                status: 'pending',
                image: ''
              });
              setImageFileName('');
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
<div className="flex justify-end mb-4">
      <ExportToExcel
  data={cases}
  columns={columns}
  fileName="Child_Marriage_Cases"
/>
</div>
      <DataTable data={cases} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ManageChildMarriageCases;
