// src/components/Class.jsx
import { useState } from 'react';
import { subjectsByClass } from '../../Data/subjectsData';

const Class = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSubjects, setShowSubjects] = useState(false);


  const classButtons = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleClassClick = (classNumber) => {
    setSelectedClass(classNumber);
    setShowSubjects(true);
    setSelectedSubject(null); 
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleBackToClasses = () => {
    setShowSubjects(false);
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
       
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            School Classes & Subjects
          </h1>
          <p className="text-lg text-gray-600">
            Select a class to view available subjects
          </p>
        </div>

        {(selectedClass || selectedSubject) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {selectedClass && (
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  Class: {selectedClass}
                </span>
              )}
              {selectedSubject && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  Subject: {selectedSubject}
                </span>
              )}
              {showSubjects && (
                <button
                  onClick={handleBackToClasses}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Classes
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          {!showSubjects ? (

            <>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Select Your Class
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {classButtons.map((classNum) => (
                  <button
                    key={classNum}
                    onClick={() => handleClassClick(classNum)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
                  >
                    Class {classNum}
                  </button>
                ))}
              </div>
            </>
          ) : (
 
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Subjects for Class {selectedClass}
                </h2>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {subjectsByClass[selectedClass]?.length} Subjects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectsByClass[selectedClass]?.map((subject, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubjectClick(subject)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                      selectedSubject === subject
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:shadow-md'
                    }`}
                  >
                    <div className="font-semibold text-lg">{subject}</div>
                    <div className="text-sm opacity-75 mt-1">
                      Class {selectedClass}
                    </div>
                  </button>
                ))}
              </div>

              {selectedSubject && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg border border-green-200">
                  <h3 className="font-bold text-lg text-green-800 mb-2">
                    Selection Confirmed!
                  </h3>
                  <p className="text-green-700">
                    You have selected <strong>{selectedSubject}</strong> for{' '}
                    <strong>Class {selectedClass}</strong>
                  </p>
                </div>
              )}
            </>
          )}
        </div>

    
        <div className="mt-6 text-center text-gray-600 text-sm">
          {!showSubjects
            ? 'Click on any class button to view subjects'
            : 'Click on a subject to select it'}
        </div>
      </div>
    </div>
  );
};

export default Class;