import { useEffect, useState } from "react";
import SchoolImage from '../components/SchoolImage';

export default function ShowSchools() {
  // Main data states
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  
  // Edit functionality
  const [editingSchool, setEditingSchool] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  // Search and filter states - added these for better user experience
  const [citySearch, setCitySearch] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState([]);
  
  // Dropdown controls - needed to manage which dropdown is open
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showHostelDropdown, setShowHostelDropdown] = useState(false);
  
  // Static data - these could come from API later
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
  const boards = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'];
  const types = ['All Boys', 'All Girls', 'Co-Education'];
  const hostelOptions = ['Yes', 'No'];

  // Fetch schools from backend API
  const fetchSchools = async (page = 1, searchTerm = "") => {
    try {
      const response = await fetch(`/api/getSchools`);
      const data = await response.json();
      
      if (data.schools) {
        setSchools(data.schools);
        setPagination(data.pagination || {}); // fallback to empty object
      } else {
        setSchools([]); // no schools found
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      setSchools([]); // reset on error
    }
  };

  // Load schools when component mounts or search changes
  useEffect(() => {
    fetchSchools(currentPage, search);
  }, [currentPage, search]);

  // Handle clicking outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = () => {
      closeAllDropdowns();
    };

    document.addEventListener('click', handleClickOutside);
    // Cleanup event listener on unmount
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  // Handle city filter selection
  const handleCityFilter = (city) => {
    if (city === 'Select All') {
      // Toggle all cities - if all selected, clear; otherwise select all
      setSelectedCities(selectedCities.length === cities.length ? [] : cities);
    } else {
      // Toggle individual city
      setSelectedCities(prev => 
        prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
      );
    }
  };

  // Handle board filter - similar logic to city filter
  const handleBoardFilter = (board) => {
    if (board === 'Select All') {
      setSelectedBoards(selectedBoards.length === boards.length ? [] : boards);
    } else {
      setSelectedBoards(prev => 
        prev.includes(board) ? prev.filter(b => b !== board) : [...prev, board]
      );
    }
  };

  // Handle school type filter
  const handleTypeFilter = (type) => {
    if (type === 'Select All') {
      setSelectedTypes(selectedTypes.length === types.length ? [] : types);
    } else {
      setSelectedTypes(prev => 
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    }
  };

  // Handle hostel facility filter
  const handleHostelFilter = (hostel) => {
    if (hostel === 'Select All') {
      setSelectedHostel(selectedHostel.length === hostelOptions.length ? [] : hostelOptions);
    } else {
      setSelectedHostel(prev => 
        prev.includes(hostel) ? prev.filter(h => h !== hostel) : [...prev, hostel]
      );
    }
  };

  // Filter cities based on search input
  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Utility function to close all dropdowns
  const closeAllDropdowns = () => {
    setShowCityDropdown(false);
    setShowBoardDropdown(false);
    setShowTypeDropdown(false);
    setShowHostelDropdown(false);
  };

  // Handle dropdown toggle logic
  const toggleDropdown = (dropdownType, e) => {
    e.stopPropagation(); // prevent event bubbling
    
    // Check if clicking the same dropdown that's already open
    if ((dropdownType === 'city' && showCityDropdown) ||
        (dropdownType === 'board' && showBoardDropdown) ||
        (dropdownType === 'type' && showTypeDropdown) ||
        (dropdownType === 'hostel' && showHostelDropdown)) {
      closeAllDropdowns(); // close if already open
      return;
    }
    
    // Close all dropdowns first, then open the selected one
    closeAllDropdowns();
    switch(dropdownType) {
      case 'city': setShowCityDropdown(true); break;
      case 'board': setShowBoardDropdown(true); break;
      case 'type': setShowTypeDropdown(true); break;
      case 'hostel': setShowHostelDropdown(true); break;
    }
  };

  // Delete school with confirmation
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this school?')) {
      try {
        const response = await fetch(`/api/deleteSchool?id=${id}`, { method: 'DELETE' });
        if (response.ok) fetchSchools(currentPage, search); // refresh list
      } catch (error) {
        console.error('Error deleting school:', error);
      }
    }
  };

  // Start editing a school
  const handleEdit = (school) => {
    setEditingSchool(school.id);
    setEditForm(school); // populate form with current data
  };

  // Save updated school data
  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/updateSchool', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        setEditingSchool(null); // exit edit mode
        fetchSchools(currentPage, search); // refresh data
      }
    } catch (error) {
      console.error('Error updating school:', error);
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: '100vh',
      background: '#f8f9fa',
      color: '#333'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(95, 66, 160, 0.95)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        padding: '15px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          letterSpacing: '3px',
          background: 'linear-gradient(45deg, #fff, #e0e7ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          EDUCONNECT
        </div>
        <nav>
          <a href="/addSchool" style={{
            background: 'linear-gradient(45deg, #5ca223, #6dd230)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(92, 162, 35, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(92, 162, 35, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(92, 162, 35, 0.3)';
          }}>
            + Add School
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '40px 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '42px',
            fontWeight: '800',
            background: 'linear-gradient(45deg, #5f42a0, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '15px'
          }}>
            Discover Perfect Schools
          </h1>
          <p style={{ 
            fontSize: '18px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Find the ideal educational environment for your child with our comprehensive school search platform
          </p>
        </div>

        {/* Search Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px',
          position: 'relative'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="🔍 Search schools by name, location..."
              value={search}
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '18px 24px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '50px',
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 15px 40px rgba(95, 66, 160, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>
        </div>

        {/* Filter Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '50px', 
          flexWrap: 'wrap',
          padding: '20px',
          background: 'rgba(95, 66, 160, 0.05)',
          borderRadius: '15px'
        }}>
          {[
            { key: 'city', label: 'Choose City', show: showCityDropdown },
            { key: 'board', label: 'Choose Board', show: showBoardDropdown },
            { key: 'type', label: 'Choose Type', show: showTypeDropdown },
            { key: 'hostel', label: 'Hostel Facility', show: showHostelDropdown }
          ].map(({ key, label, show }) => (
            <div key={key} style={{ position: 'relative' }}>
              <button
                onClick={(e) => toggleDropdown(key, e)}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  background: show ? 'linear-gradient(45deg, #5ca223, #6dd230)' : 'linear-gradient(45deg, #5f42a0, #764ba2)',
                  color: 'white',
                  cursor: 'pointer',
                  minWidth: '140px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  boxShadow: show ? '0 8px 25px rgba(92, 162, 35, 0.3)' : '0 8px 25px rgba(95, 66, 160, 0.3)',
                  transform: show ? 'translateY(-2px)' : 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  if (!show) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(95, 66, 160, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!show) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(95, 66, 160, 0.3)';
                  }
                }}
              >
                {label} {show ? '▲' : '▼'}
              </button>
              
              {show && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '50px',
                    left: '0',
                    background: '#fff',
                    border: 'none',
                    borderRadius: '15px',
                    minWidth: key === 'city' ? '250px' : '180px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    animation: 'slideDown 0.3s ease'
                  }}>
                  {key === 'city' && (
                    <input
                      type="text"
                      placeholder="🔍 Search cities..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderBottom: '1px solid #eee',
                        outline: 'none',
                        borderRadius: '15px 15px 0 0',
                        fontSize: '14px'
                      }}
                    />
                  )}
                  
                  <div
                    onClick={() => {
                      if (key === 'city') handleCityFilter('Select All');
                      else if (key === 'board') handleBoardFilter('Select All');
                      else if (key === 'type') handleTypeFilter('Select All');
                      else handleHostelFilter('Select All');
                    }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      backgroundColor: (() => {
                        if (key === 'city') return selectedCities.length === cities.length ? '#5ca223' : '#f8f9fa';
                        if (key === 'board') return selectedBoards.length === boards.length ? '#5ca223' : '#f8f9fa';
                        if (key === 'type') return selectedTypes.length === types.length ? '#5ca223' : '#f8f9fa';
                        return selectedHostel.length === hostelOptions.length ? '#5ca223' : '#f8f9fa';
                      })(),
                      color: (() => {
                        if (key === 'city') return selectedCities.length === cities.length ? 'white' : 'black';
                        if (key === 'board') return selectedBoards.length === boards.length ? 'white' : 'black';
                        if (key === 'type') return selectedTypes.length === types.length ? 'white' : 'black';
                        return selectedHostel.length === hostelOptions.length ? 'white' : 'black';
                      })(),
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {(() => {
                      if (key === 'city') return selectedCities.length === cities.length ? '☑' : '☐';
                      if (key === 'board') return selectedBoards.length === boards.length ? '☑' : '☐';
                      if (key === 'type') return selectedTypes.length === types.length ? '☑' : '☐';
                      return selectedHostel.length === hostelOptions.length ? '☑' : '☐';
                    })()} Select All
                  </div>
                  
                  {(() => {
                    let options, selectedItems, handler;
                    if (key === 'city') {
                      options = filteredCities;
                      selectedItems = selectedCities;
                      handler = handleCityFilter;
                    } else if (key === 'board') {
                      options = boards;
                      selectedItems = selectedBoards;
                      handler = handleBoardFilter;
                    } else if (key === 'type') {
                      options = types;
                      selectedItems = selectedTypes;
                      handler = handleTypeFilter;
                    } else {
                      options = hostelOptions;
                      selectedItems = selectedHostel;
                      handler = handleHostelFilter;
                    }
                    
                    return options.map(option => (
                      <div
                        key={option}
                        onClick={() => handler(option)}
                        style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          backgroundColor: selectedItems.includes(option) ? '#5ca223' : 'white',
                          color: selectedItems.includes(option) ? 'white' : '#333',
                          transition: 'all 0.2s ease',
                          borderLeft: selectedItems.includes(option) ? '4px solid #4a9c1a' : '4px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedItems.includes(option)) {
                            e.target.style.backgroundColor = '#f0f0f0';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedItems.includes(option)) {
                            e.target.style.backgroundColor = 'white';
                          }
                        }}
                      >
                        {selectedItems.includes(option) ? '☑' : '☐'} {option}
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schools Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {schools.map((school) => (
            <div
              key={school.id}
              style={{
                background: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <SchoolImage 
                  src={school.image} 
                  alt={school.name}
                  style={{
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)'
                }} />
              </div>
              
              <div style={{ padding: '25px' }}>
                {editingSchool === school.id ? (
                  <div style={{ textAlign: 'left' }}>
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        marginBottom: '10px', 
                        border: '2px solid #eee',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <input
                      value={editForm.city}
                      onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        marginBottom: '10px', 
                        border: '2px solid #eee',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        marginBottom: '15px', 
                        border: '2px solid #eee',
                        borderRadius: '8px',
                        fontSize: '16px',
                        minHeight: '80px'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={handleUpdate} style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(45deg, #5ca223, #6dd230)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}>Save</button>
                      <button onClick={() => setEditingSchool(null)} style={{
                        padding: '10px 20px',
                        background: '#f0f0f0',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 style={{ 
                      margin: '0 0 15px 0', 
                      fontSize: '22px', 
                      fontWeight: '700',
                      color: '#333',
                      lineHeight: '1.3'
                    }}>
                      {school.name}
                    </h3>
                    <p style={{ 
                      margin: '8px 0', 
                      color: '#5f42a0', 
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      📍 {school.city}
                    </p>
                    <p style={{ 
                      margin: '8px 0', 
                      color: '#666', 
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      {school.address}
                    </p>
                    <div style={{ 
                      marginTop: '20px', 
                      display: 'flex', 
                      gap: '8px', 
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => handleEdit(school)}
                        style={{
                          padding: '8px 16px',
                          background: 'linear-gradient(45deg, #007bff, #0056b3)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(school.id)}
                        style={{
                          padding: '8px 16px',
                          background: 'linear-gradient(45deg, #dc3545, #c82333)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        🗑️ Delete
                      </button>
                      <button style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(45deg, #5ca223, #6dd230)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease'
                      }}>
                        🎓 Apply Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {schools.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '20px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏫</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>No schools found</h3>
            <p style={{ marginBottom: '20px' }}>Start building your school directory today!</p>
            <a href="/addSchool" style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #5ca223, #6dd230)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              + Add First School
            </a>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          main {
            margin: 10px !important;
            padding: 20px !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}