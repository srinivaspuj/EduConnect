import Link from 'next/link';

export default function Home() {
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
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
      </header>

      {/* Main Content */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '40px 20px'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          maxWidth: '800px'
        }}>
          <h1 style={{ 
            fontSize: '48px',
            fontWeight: '800',
            background: 'linear-gradient(45deg, #5f42a0, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            EduConnect Platform
          </h1>
          <p style={{ 
            fontSize: '20px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '40px'
          }}>
            Connect with the perfect educational institutions through our comprehensive platform.
            Discover schools, explore opportunities, and find your ideal learning environment.
          </p>
        </div>

        {/* Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '800px',
          width: '100%'
        }}>
          {/* Add School Card */}
          <Link href="/addSchool" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              e.target.style.borderColor = '#5ca223';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.target.style.borderColor = 'transparent';
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>🏫</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#333',
                marginBottom: '15px'
              }}>Add New School</h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.5',
                marginBottom: '25px'
              }}>Register a new educational institution with complete details, images, and contact information.</p>
              <div style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #5ca223, #6dd230)',
                color: 'white',
                borderRadius: '25px',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}>
                + Add School
              </div>
            </div>
          </Link>

          {/* View Schools Card */}
          <Link href="/showSchools" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              e.target.style.borderColor = '#5f42a0';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.target.style.borderColor = 'transparent';
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>📚</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#333',
                marginBottom: '15px'
              }}>Browse Schools</h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.5',
                marginBottom: '25px'
              }}>Explore our comprehensive database of schools with advanced search and filtering options.</p>
              <div style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #5f42a0, #764ba2)',
                color: 'white',
                borderRadius: '25px',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}>
                📖 View Schools
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div style={{
          marginTop: '80px',
          textAlign: 'center',
          maxWidth: '1000px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '40px'
          }}>Platform Features</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>🔍</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Advanced Search</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Find schools by name, location, and various filters</p>
            </div>
            
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>📱</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Responsive Design</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Works seamlessly on desktop and mobile devices</p>
            </div>
            
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>⚡</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Fast & Secure</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Built with modern technology for optimal performance</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          main {
            padding: 20px 15px !important;
          }
          
          h1 {
            font-size: 36px !important;
          }
          
          p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}