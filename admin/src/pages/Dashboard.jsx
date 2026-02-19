import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import {  getChildMarriageCases, getSeedDistributions } from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    childmarriagecases: 0,
    seeddistributions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [childmarriagecasesRes, seeddistributionRes] = await Promise.all([
          getChildMarriageCases(),
          getSeedDistributions(),
        ]);
        setStats({
          childmarriagecases: childmarriagecasesRes.data.length,
          seeddistributions: seeddistributionRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Child Marriage Cases" value={stats.childmarriagecases} icon="📊" />
        <DashboardCard title="Seed distributions" value={stats.seeddistributions} icon="📄" />
      </div>
    </div>
  );
};

export default Dashboard;
