export default function SchoolImage({ src, alt, style }) {
  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/placeholder-school.jpg';
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    return `/schoolImages/${imagePath}`;
  };

  return (
    <img
      src={getImageSrc(src)}
      alt={alt || 'School Image'}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '12px',
        ...style
      }}
      onError={(e) => {
        e.target.src = '/placeholder-school.jpg';
      }}
    />
  );
}