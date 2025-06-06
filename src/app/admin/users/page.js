import {
    FaMask,
  } from 'react-icons/fa';
export default function UsersPage() {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600 mt-1">Manage user accounts and permissions.</p>
          </div>
          <button className="px-4 py-2 bg-[#1C1C1C] text-white rounded-lg hover:bg-gray-800 transition-colors">
            Add New User
          </button>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center mb-4">
                <FaMask className="w-10 h-10 text-black" /> </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Users Management</h3>
          <p className="text-gray-600">This section will contain user listings, role management, and account operations.</p>
        </div>
      </div>
    );
  }