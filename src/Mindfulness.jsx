import React from 'react';

const Mindfulness = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Mindfulness Module</h1>
      <p className="text-green-700 mb-6">
        Practice mindfulness and stay present in the moment.
      </p>
      <p className="italic text-green-600 mb-6">
        "Wherever you are, be all there."
      </p>
      <button className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 transition">
        Learn More
      </button>
    </div>
  );
};

export default Mindfulness;
