import React from 'react';
import { logout } from './../redux/authSlice'
import { useAppDispatch } from './../hooks/useAppDispatch'
import { Component} from './Dashboard/PieChart'

const Dashboard: React.FC = () => {
 const dispatch = useAppDispatch();

   const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">My Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            New Action
          </button>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Card Title 1</h3>
              <Component/>
           
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Card Title 2</h3>
            <p className="mt-2 text-gray-600">
              Brief description of the content goes here.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Card Title 3</h3>
            <p className="mt-2 text-gray-600">
              Brief description of the content goes here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
