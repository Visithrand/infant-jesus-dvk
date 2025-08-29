import { useState } from 'react';
import { springApiFetch, nodeApiFetch, debugApiConfig, API_CONFIG, API_BASE_URLS } from '@/lib/api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState<string>('');

  const testApiConfig = () => {
    debugApiConfig();
    setTestResult('Check browser console for API configuration details');
  };

  const testSpringApi = async () => {
    try {
      console.log('🧪 Testing Spring API...');
      const response = await springApiFetch('/events');
      console.log('✅ Spring API Response:', response.status, response.statusText);
      setTestResult(`Spring API Test: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.error('❌ Spring API Error:', error);
      setTestResult(`Spring API Error: ${error}`);
    }
  };

  const testNodeApi = async () => {
    try {
      console.log('🧪 Testing Node API...');
      const response = await nodeApiFetch('/send-query');
      console.log('✅ Node API Response:', response.status, response.statusText);
      setTestResult(`Node API Test: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.error('❌ Node API Error:', error);
      setTestResult(`Node API Error: ${error}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">🔧 API Configuration Test</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-3 rounded">
          <h3 className="font-semibold">Current Configuration:</h3>
          <p><strong>Spring Backend:</strong> {API_CONFIG.SPRING_BACKEND}</p>
          <p><strong>Node Server:</strong> {API_CONFIG.NODE_SERVER}</p>
          <p><strong>Spring API URL:</strong> {API_BASE_URLS.SPRING}</p>
          <p><strong>Node API URL:</strong> {API_BASE_URLS.NODE}</p>
        </div>

        <div className="space-y-2">
          <button 
            onClick={testApiConfig}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            🔍 Debug API Config
          </button>
          
          <button 
            onClick={testSpringApi}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            🧪 Test Spring API
          </button>
          
          <button 
            onClick={testNodeApi}
            className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            🧪 Test Node API
          </button>
        </div>

        {testResult && (
          <div className="bg-gray-100 p-3 rounded">
            <strong>Test Result:</strong> {testResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
