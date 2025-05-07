import React from 'react';

const CBT = () => {
  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-purple-800 mb-4">CBT Module</h1>
      <p className="text-purple-700 mb-6">
        Explore cognitive behavioral therapy techniques for mental well-being.
      </p>
      <p className="italic text-purple-600 mb-6">
        "Change your thoughts, change your world."
      </p>
      <button className="bg-purple-500 text-white py-2 px-4 rounded shadow hover:bg-purple-600 transition">
        Learn More
      </button>
    </div>
  );
};

export default CBT;
