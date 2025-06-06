import { fetchDashboardData } from '../../../lib/admin-data';
import DashboardStats from '@/app/components/DashboardStats';

// ISR Configuration: Revalidate every hour
export const revalidate = 3600;

// Optional: Configure runtime for better ISR performance
export const runtime = 'nodejs'; // or 'edge' for faster cold starts

export default async function AdminDashboard() {
  console.log('🔄 Admin Dashboard: Starting ISR data fetch...');
  
  const dashboardData = await fetchDashboardData();
  
  console.log('🔄 ISR Status:', {
    dataReceived: !!dashboardData,
    timestamp: new Date().toISOString(),
    revalidateTime: '3600 seconds (1 hour)'
  });

  return <DashboardStats data={dashboardData} />;
}
