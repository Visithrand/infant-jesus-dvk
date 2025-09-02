import React from 'react';

const TestComponent = () => {
  return (
    <div className="test-component">
      <div className="test-content">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          🎯 Test Component Working!
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          If you can see this, React is rendering correctly.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
          <p style={{ margin: '0.5rem 0' }}>
            Backend URL: {(globalThis as any).__BACKEND_URL__ || 'Not set'}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            Node Server URL: {(globalThis as any).__NODE_SERVER_URL__ || 'Not set'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
