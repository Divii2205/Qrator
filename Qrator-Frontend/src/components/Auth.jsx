import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        handlePostSignIn(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePostSignIn = async (user) => {
    // Create or update user profile in Supabase
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        email: user.email,
        username: user.email.split('@')[0], // Generate username from email
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error updating user profile:', error);
    }

    // Redirect to home page
    navigate('/home');
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes:'https://www.googleapis.com/auth/youtube.readonly',
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
    } catch (error) {
      setError(error.message);
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="cursor-pointer px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
            Continue with Google
          </>
        )}
      </button>
      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
} 