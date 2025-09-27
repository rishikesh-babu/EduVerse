// src/components/ClassSidebar.jsx
import { useState } from 'react';
import { subjectsByClass } from '../../Data/subjectsData';

const ClassSidebar = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Generate class buttons from 1 to 12
  const classButtons = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleClassClick = (classNumber) => {
    setSelectedClass(classNumber);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-r-lg shadow-lg z-50 hover:bg-blue-700 transition-colors"
        title="Expand Subjects"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full bg-white shadow-2xl border-r border-gray-200 z-40 transition-all duration-300 ease-in-out">
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Collapse Sidebar"
      >
        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

     
      <div className="w-80 h-full flex flex-col">
      
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
          <h2 className="text-xl font-bold mb-1">Classes & Subjects</h2>
          <p className="text-blue-100 text-sm">Select class and subject</p>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={handleBackToClasses}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              !selectedClass 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Classes
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              selectedClass 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Subjects
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!selectedClass ? (
            <>
              <h3 className="font-semibold text-gray-700 mb-3">Select Class</h3>
              <div className="grid grid-cols-2 gap-2">
                {classButtons.map((classNum) => (
                  <button
                    key={classNum}
                    onClick={() => handleClassClick(classNum)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
                  >
                    Class {classNum}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">
                  Class {selectedClass} Subjects
                </h3>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                  {subjectsByClass[selectedClass]?.length} subjects
                </span>
              </div>

              <div className="space-y-2">
                {subjectsByClass[selectedClass]?.map((subject, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubjectClick(subject)}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      selectedSubject === subject
                        ? 'bg-green-500 text-white border-green-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-medium">{subject}</div>
                  </button>
                ))}
              </div>

              {selectedSubject && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Selected:</strong> {selectedSubject} (Class {selectedClass})
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {selectedClass ? `${subjectsByClass[selectedClass]?.length} subjects` : '12 classes'}
            </span>
            <button
              onClick={handleBackToClasses}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSidebar;