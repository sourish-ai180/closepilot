import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-white bg-navy-900 selection:bg-accent-indigo selection:text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;