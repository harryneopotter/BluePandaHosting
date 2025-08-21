"use client";

export default function SimpleTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #0f172a, #1e293b)', 
      color: 'white',
      padding: '2rem',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        🐼 Q Panda Test
      </h1>
      <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        <p>✅ React is working!</p>
        <p>✅ Styles are loading!</p>
        <p>✅ Static export is working!</p>
      </div>
      
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        background: 'rgba(6, 182, 212, 0.1)', 
        border: '2px solid #06b6d4',
        borderRadius: '1rem'
      }}>
        <h2 style={{ color: '#22d3ee' }}>Deployment Status</h2>
        <p>If you can see this, the basic React app is working correctly on DigitalOcean!</p>
        <p>The issue with the main app is likely in the complex animations or Framer Motion.</p>
      </div>
    </div>
  );
}
