// src/components/ClassSidebar.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveClassDetails } from '../../redux/features/classSlice';
import axiosInstance from '../../Config/AxiosInstance';
import { toast } from 'react-toastify';

const ClassSidebar = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { classDetails } = useSelector((state) => state.class);
  const sortedClasses = classDetails ? [...classDetails].sort((a, b) => a.name - b.name) : [];

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjectsByClass(selectedClass._id);
    }
  }, [selectedClass]);

  function fetchClasses() {
    axiosInstance({
      method: 'GET',
      url: '/class/get-all-classes'
    })
      .then((res) => {
        console.log('res :>> ', res);
        dispatch(saveClassDetails(res?.data?.data));
      })
      .catch((err) => {
        console.log('err :>> ', err);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      });
  }

  function fetchSubjectsByClass(classId) {
    setLoading(true);
    axiosInstance({
      method: 'GET',
      url: `/subject/get-subject/${classId}`
    })
      .then((res) => {
        console.log('Subjects res :>> ', res);
        setSubjects(res?.data?.data || []);
      })
      .catch((err) => {
        console.log('err :>> ', err);
        toast.error(err?.response?.data?.message || 'Failed to fetch subjects');
        setSubjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    // You can add additional logic here like dispatching to Redux
    // dispatch(selectSubject(subject));
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setSelectedSubject(null);
    setSubjects([]);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
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
                {sortedClasses?.map((classItem) => (
                  <button
                    key={classItem._id}
                    onClick={() => handleClassClick(classItem)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
                  >
                    Class {classItem.name}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">
                  Class {selectedClass.name} Subjects
                </h3>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                  {subjects.length} subjects
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : subjects.length > 0 ? (
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <div
                      key={subject._id}
                      className={`w-full p-3 rounded-lg border transition-all ${
                        selectedSubject?._id === subject._id
                          ? 'bg-green-500 text-white border-green-500 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:shadow-sm'
                      }`}
                    >
                      <div 
                        className="font-medium cursor-pointer"
                        onClick={() => handleSubjectClick(subject)}
                      >
                        {subject.name} {/* Changed from subject.subjectName to subject.name */}
                      </div>
                      {subject.file && (
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            📚 Textbook available
                          </span>
                          <button
                            onClick={() => openFile(subject.file)}
                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                          >
                            View File
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No subjects found for this class</p>
                  <p className="text-sm">Add subjects in the admin panel</p>
                </div>
              )}

              {selectedSubject && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Selected:</strong> {selectedSubject.name} (Class {selectedClass.name})
                  </p>
                  {selectedSubject.file && (
                    <div className="mt-2">
                      <p className="text-green-700 text-xs">
                        📚 Textbook: 
                        <button 
                          onClick={() => openFile(selectedSubject.file)}
                          className="ml-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          View File
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {selectedClass ? `${subjects.length} subjects` : `${classDetails?.length || 0} classes`}
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