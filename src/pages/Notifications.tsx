import React from 'react';
import { Bell } from 'lucide-react';

function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Stay updated with important campaign alerts
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 text-center text-gray-500">
          <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No notifications yet</p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;