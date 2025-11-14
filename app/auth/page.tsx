'use client'

import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoopxHiring() {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      console.log('User signed in:', user)
      // Redirect to home or dashboard after successful login
      router.push('/')
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex">
 
      <div className="w-1/2 p-12 flex flex-col justify-between">

        <div className="text-white text-3xl font-bold">Loopx</div>
        
   
        <div className="max-w-md">
          <h1 className="text-white text-4xl font-bold mb-2">
            Start Hiring with Loopx
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Already have an account? <span className="text-blue-400 cursor-pointer">Sign in →</span>
          </p>
          
     
          <button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white rounded-lg py-3 px-4 flex items-center justify-center gap-3 mb-6 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900 text-gray-500">OR</span>
            </div>
          </div>
          
  
          <input 
            type="email" 
            placeholder="Work email"
            className="w-full bg-neutral-800 text-white rounded-lg py-3 px-4 mb-4 border border-gray-700 focus:border-gray-600 focus:outline-none"
          />
          
      
          <button className="w-full bg-neutral-800 text-white rounded-lg py-3 px-4 mb-6 hover:bg-neutral-700 transition">
            Continue
          </button>
          
     
          <p className="text-gray-500 text-xs mb-4">
            By signing up, you agree to the <span className="text-gray-400 underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-gray-400 underline cursor-pointer">Privacy Policy</span>.
          </p>
          
       
          <p className="text-gray-500 text-sm">
            Need help? <span className="text-blue-400 cursor-pointer">Contact support</span>
          </p>
        </div>
        
        <div></div>
      </div>
      

      <div className="w-1/2 relative overflow-hidden m-5 rounded-2xl">
        <div 
          className="absolute inset-0 "
          style={{ 
            backgroundImage: `url('/authbg.png')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />
      </div>
    </div>
  );
}