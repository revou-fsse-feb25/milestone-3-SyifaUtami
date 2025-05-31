'use client';

import { useState } from 'react';
import Highlighted from "@/app/components/Textstyle";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setError(""); // Clear previous errors
        
        setLoading(true);
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" // Fixed: was "application-json"
                },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) {
                throw new Error("Invalid credentials");
            }
            
            const data = await response.json();
            
            // Store token 
            localStorage.setItem("access_token", data.access_token);
            router.push("/dashboard"); //route to dashboard

        } catch (error) {
            setError(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }; 

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <form onSubmit={handleSubmit}>
                <h1 className='p-10 text-center'>
                    <Highlighted>Login</Highlighted>
                </h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email||''}
                    onChange={(e) => setEmail(e.target.value)}/*on change, update state */ 
                    className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
                    required
                />
                
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password||''}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
                    required
                />
                
                <button
                    type="submit"
                    disabled={loading} //dont click button when load 
                    className="w-full bg-[#1ceff4] text-[#1C1C1C] font-bold py-2 rounded-lg hover:bg-cyan-300 transition disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Submit'}
                </button>                
            </form>
        </div>
    );
}

/*'use client';

import { useState } from 'react';
import Highlighted from "@/app/components/Textstyle";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false  )
    
    const handleSubmit = async () => {
        setError(" ");
        
        setLoading(true);
        try{
            const response = await fetch ("https://api.escuelajs.co/api/v1/auth/login",
            {
                method: "POST",
                headers: {"content-type":"application-json"},
                body: JSON.stringify({email,  password}),
            });
            if (!response.ok) {
                throw new Error ("invalid credentials ");
            }
        ;
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token); /* di 'set untuk bisa dipakai 
    } catch (error) {
        setError(error.message || "login failed")
    } finally {
        setLoading(false);
    }
  
}; 


    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <form onSubmit={handleSubmit}>
            <h1 className='p-10 text-center'> <Highlighted> Login </Highlighted> </h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"/>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"/>
                <button
                    type="submit"
                    className="w-full bg-[#1ceff4] text-[#1C1C1C] font-bold py-2 rounded-lg hover:bg-cyan-300 transition"
                    >Submit</button>                
            </form>
        </div>
    );
} */ 