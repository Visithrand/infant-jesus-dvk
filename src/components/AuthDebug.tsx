import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthDebug = () => {
  const [debugInfo, setDebugInfo] = useState<string>('');

  const checkLocalStorage = () => {
    const auth = localStorage.getItem('auth');
    const adminToken = localStorage.getItem('adminToken');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const info = `
🔍 Local Storage Debug:
- auth: ${auth ? 'Present' : 'Missing'}
- adminToken: ${adminToken ? 'Present' : 'Missing'}
- token: ${token ? 'Present' : 'Missing'}
- role: ${role || 'Missing'}
- username: ${username || 'Missing'}
- email: ${email || 'Missing'}

📋 Auth Object Content:
${auth ? JSON.stringify(JSON.parse(auth), null, 2) : 'No auth object'}

🔑 Token Values:
- adminToken: ${adminToken ? adminToken.substring(0, 20) + '...' : 'Missing'}
- token: ${token ? token.substring(0, 20) + '...' : 'Missing'}
    `;
    
    setDebugInfo(info);
    console.log('🔍 Auth Debug Info:', { auth, adminToken, token, role, username, email });
  };

  const clearAllStorage = () => {
    localStorage.clear();
    setDebugInfo('✅ All localStorage cleared!');
  };

  const testAuthFlow = () => {
    // Simulate the auth flow
    const testToken = 'test-token-' + Date.now();
    const testAuth = {
      token: testToken,
      username: 'testuser',
      role: 'ADMIN',
      email: 'test@example.com'
    };
    
    localStorage.setItem('auth', JSON.stringify(testAuth));
    localStorage.setItem('adminToken', testToken);
    localStorage.setItem('token', testToken);
    localStorage.setItem('role', 'ADMIN');
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('email', 'test@example.com');
    
    setDebugInfo('✅ Test auth data set! Check localStorage and try logging in again.');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">🔧 Authentication Debug Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={checkLocalStorage} variant="outline">
              🔍 Check LocalStorage
            </Button>
            <Button onClick={clearAllStorage} variant="destructive">
              🗑️ Clear All Storage
            </Button>
            <Button onClick={testAuthFlow} variant="secondary">
              🧪 Test Auth Flow
            </Button>
          </div>
          
          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <pre className="text-sm whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">💡 Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "🔍 Check LocalStorage" to see current auth state</li>
              <li>If auth data exists but login still fails, click "🗑️ Clear All Storage"</li>
              <li>Try logging in again with your credentials</li>
              <li>If issues persist, check browser console for errors</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDebug;
