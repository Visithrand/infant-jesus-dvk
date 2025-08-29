import { useState } from 'react';
import { springApiFetch, nodeApiFetch, debugApiConfig, API_CONFIG, API_BASE_URLS } from '@/lib/api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testApiConfig = () => {
    debugApiConfig();
    setTestResult('🔧 API Configuration logged to console. Check browser console for details.');
  };

  const testSpringApi = async () => {
    setIsLoading(true);
    try {
      const response = await springApiFetch('/health');
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Spring API Connected! Status: ${response.status}, Data: ${JSON.stringify(data)}`);
      } else {
        setTestResult(`❌ Spring API Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ Spring API Network Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testNodeApi = async () => {
    setIsLoading(true);
    try {
      const response = await nodeApiFetch('/health');
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Node API Connected! Status: ${response.status}, Data: ${JSON.stringify(data)}`);
      } else {
        setTestResult(`❌ Node API Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ Node API Network Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testImageUpload = async () => {
    setIsLoading(true);
    try {
      // Create a test image file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('TEST', 20, 50);
      }
      
      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append('image', blob, 'test-image.png');
          
          try {
            const response = await springApiFetch('/test-upload', {
              method: 'POST',
              body: formData
            });
            
            if (response.ok) {
              setTestResult('✅ Image Upload Test: FormData sent successfully!');
            } else {
              setTestResult(`❌ Image Upload Test Failed: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            setTestResult(`❌ Image Upload Test Error: ${error}`);
          }
        }
        setIsLoading(false);
      }, 'image/png');
    } catch (error) {
      setTestResult(`❌ Image Upload Test Error: ${error}`);
      setIsLoading(false);
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
            disabled={isLoading}
          >
            🔍 Debug API Config
          </button>
          <button 
            onClick={testSpringApi} 
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            🧪 Test Spring API
          </button>
          <button 
            onClick={testNodeApi} 
            className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            disabled={isLoading}
          >
            🧪 Test Node API
          </button>
          <button 
            onClick={testImageUpload} 
            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            disabled={isLoading}
          >
            🖼️ Test Image Upload
          </button>
        </div>
        {isLoading && (
          <div className="text-center text-gray-600">
            ⏳ Testing... Please wait
          </div>
        )}
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
