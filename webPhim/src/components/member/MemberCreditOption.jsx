import React from 'react';

const MemberCreditOption = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Choose your plan.</h1>
        <ul className="mb-10 space-y-4 w-full">
          <li className="flex items-center gap-3 text-lg text-gray-700">
            <span className="text-red-600 text-2xl">&#10003;</span>
            No commitments, cancel anytime.
          </li>
          <li className="flex items-center gap-3 text-lg text-gray-700">
            <span className="text-red-600 text-2xl">&#10003;</span>
            Endless entertainment for one low price.
          </li>
          <li className="flex items-center gap-3 text-lg text-gray-700">
            <span className="text-red-600 text-2xl">&#10003;</span>
            Enjoy Netflix on all your devices.
          </li>
        </ul>
        <button
          className="w-full bg-red-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition mb-2 shadow-lg"
          onClick={() => alert('Tiếp tục bước thanh toán!')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MemberCreditOption; 