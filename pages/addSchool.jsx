import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchool() {
  // Form handling with react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // Component state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage(''); // clear previous messages

    // Create FormData for file upload
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key][0]) {
        formData.append(key, data[key][0]); // append file
      } else if (key !== 'image') {
        formData.append(key, data[key]); // append text data
      }
    });

    try {
      const response = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData, // send as multipart/form-data
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage('School added successfully!');
        reset(); // clear form on success
        setSelectedFile(null); // clear selected file
      } else {
        setMessage(result.message || 'Error adding school. Please try again.');
      }
    } catch (error) {
      setMessage('Error adding school. Please try again.');
    }

    setIsSubmitting(false);
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
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ 
          fontSize: 'clamp(20px, 5vw, 28px)', 
          fontWeight: '700', 
          letterSpacing: 'clamp(1px, 0.5vw, 3px)',
          background: 'linear-gradient(45deg, #fff, #e0e7ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          minWidth: 'fit-content'
        }}>
          EDUCONNECT
        </div>
        <nav>
          <a href="/showSchools" style={{
            background: 'linear-gradient(45deg, #5ca223, #6dd230)',
            color: '#fff',
            padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: 'clamp(12px, 3vw, 16px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(92, 162, 35, 0.3)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(92, 162, 35, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(92, 162, 35, 0.3)';
          }}>
            📚 View Schools
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Page header with title and description */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '42px',
            fontWeight: '800',
            background: 'linear-gradient(45deg, #5f42a0, #764ba2)', // gradient text effect
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '15px'
          }}>
            Add New School
          </h1>
          <p style={{ 
            fontSize: '18px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Join our network of educational institutions and help students find their perfect learning environment
          </p>
        </div>
        
        {/* Main form - using grid layout for better organization */}
        <form onSubmit={handleSubmit(onSubmit)} style={{
          display: 'grid',
          gap: '25px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* First row - School name and city side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* School name field */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#333',
                fontSize: '14px'
              }}>School Name *</label>
              <input
                {...register('name', { required: 'School name is required' })}
                placeholder="Enter school name"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: errors.name ? '2px solid #dc3545' : '2px solid #e9ecef', // red border on error
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#fff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5f42a0'; // purple focus color
                  e.target.style.boxShadow = '0 0 0 3px rgba(95, 66, 160, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.name ? '#dc3545' : '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.name && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.name.message}</span>}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#333',
                fontSize: '14px'
              }}>City *</label>
              <input
                {...register('city', { required: 'City is required' })}
                placeholder="Enter city"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: errors.city ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#fff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5f42a0';
                  e.target.style.boxShadow = '0 0 0 3px rgba(95, 66, 160, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.city ? '#dc3545' : '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.city && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.city.message}</span>}
            </div>
          </div>

          {/* Address field - full width textarea */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#333',
              fontSize: '14px'
            }}>Address *</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter complete address"
              rows="4"
              style={{
                width: '100%',
                padding: '16px 20px',
                border: errors.address ? '2px solid #dc3545' : '2px solid #e9ecef',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#fff',
                resize: 'vertical', // allow vertical resize only
                minHeight: '120px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#5f42a0';
                e.target.style.boxShadow = '0 0 0 3px rgba(95, 66, 160, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.address ? '#dc3545' : '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.address && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.address.message}</span>}
          </div>

          {/* Second row - State and contact number */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#333',
                fontSize: '14px'
              }}>State *</label>
              <input
                {...register('state', { required: 'State is required' })}
                placeholder="Enter state"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: errors.state ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#fff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5f42a0';
                  e.target.style.boxShadow = '0 0 0 3px rgba(95, 66, 160, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.state ? '#dc3545' : '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.state && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.state.message}</span>}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#333',
                fontSize: '14px'
              }}>Contact Number *</label>
              <input
                {...register('contact', { 
                  required: 'Contact number is required'
                })}
                placeholder="Enter contact number"
                type="tel"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: errors.contact ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#fff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5f42a0';
                  e.target.style.boxShadow = '0 0 0 3px rgba(95, 66, 160, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.contact ? '#dc3545' : '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.contact && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.contact.message}</span>}
            </div>
          </div>

          {/* Email field with validation */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#333',
              fontSize: '14px'
            }}>Email Address *</label>
            <input
              {...register('email_id', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } // basic email validation
              })}
              placeholder="Enter email address"
              type="email"
              style={{
                width: '100%',
                padding: '16px 20px',
                border: errors.email_id ? '2px solid #dc3545' : '2px solid #e9ecef',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#fff'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#5f42a0';
                e.target.style.boxShadow = '0 0 0 3px rgba(95, 66, 160, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email_id ? '#dc3545' : '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email_id && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.email_id.message}</span>}
          </div>

          {/* File upload area with custom styling */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#333',
              fontSize: '14px'
            }}>School Image *</label>
            <div style={{
              position: 'relative',
              border: errors.image ? '2px dashed #dc3545' : '2px dashed #e9ecef',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              background: '#f8f9fa', // light background for upload area
              transition: 'all 0.3s ease'
            }}>
              {/* Hidden file input */}
              <input
                {...register('image', { required: 'School image is required' })}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0, // invisible but clickable
                  cursor: 'pointer'
                }}
              />
              {/* Visual upload area */}
              {selectedFile ? (
                <div style={{ color: '#5ca223', fontSize: '16px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
                  <div style={{ fontWeight: '600', marginBottom: '5px' }}>File Selected!</div>
                  <div style={{ fontSize: '14px', wordBreak: 'break-word' }}>{selectedFile.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Click to change image</div>
                </div>
              ) : (
                <div style={{ color: '#666', fontSize: '16px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>📸</div>
                  <div style={{ fontWeight: '600', marginBottom: '5px' }}>Click to upload school image</div>
                  <div style={{ fontSize: '14px' }}>PNG, JPG, GIF up to 10MB</div>
                </div>
              )}
            </div>
            {errors.image && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.image.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '18px 32px',
              background: isSubmitting ? '#ccc' : 'linear-gradient(45deg, #5ca223, #6dd230)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              fontWeight: '600',
              marginTop: '20px',
              transition: 'all 0.3s ease',
              boxShadow: isSubmitting ? 'none' : '0 8px 25px rgba(92, 162, 35, 0.3)',
              transform: isSubmitting ? 'none' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(92, 162, 35, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(92, 162, 35, 0.3)';
              }
            }}
          >
            {isSubmitting ? '🔄 Adding School...' : '🎓 Add School'}
          </button>
        </form>

        {message && (
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: message.includes('successfully') ? 'rgba(92, 162, 35, 0.1)' : 'rgba(220, 53, 69, 0.1)',
            color: message.includes('successfully') ? '#5ca223' : '#dc3545',
            borderRadius: '15px',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center',
            border: message.includes('successfully') ? '2px solid rgba(92, 162, 35, 0.2)' : '2px solid rgba(220, 53, 69, 0.2)',
            animation: 'slideIn 0.3s ease'
          }}>
            {message.includes('successfully') ? '✅ ' : '❌ '}{message}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
          
          form > div:first-child,
          form > div:nth-child(4) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}