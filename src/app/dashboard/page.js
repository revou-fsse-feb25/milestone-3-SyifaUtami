'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession, signOut} from "next-auth/react"

export default function Dashboard() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status == "unauthenticated") {
            router.replace("/login")
        }
    }, [status, router]);

    const handleLogout = () => {
        signOut({callbackUrl: "/login"})
        document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    };
    if (status == "loading") {
        return <div>loading...</div>
    }
    const user = session?.user || {};

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1>Dashboard</h1>
                <button
                    onClick={handleLogout}
                    
                    className="bg-[#1ceff4] text-[#1C1C1C] px-4 py-2 border-none rounded cursor-pointer"
                >
                    Logout
                </button>
            </div>

        {/* User Details */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-[#1C1C1C] p-10 rounded text-white">
            {/* User Avatar */}
            <div>
                {user?.image ? (
                    <img
                        src={user.image}
                        alt={`${user.image}'s avatar`}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#1ceff4]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full">
            <div>
                <p className="text-[#1ceff4] mb-1">Name</p>
                <p>{user?.name || 'Not provided'}</p>
            </div>
            <div>
                <p className="text-[#1ceff4] mb-1">Customer ID</p>
                <p>#{user.id}</p>
            </div>
            <div>
                <p className="text-[#1ceff4] mb-1">Email</p>
                <p>{user?.email}</p>
            </div>
            <div>
                <p className="text-[#1ceff4] mb-1">Role</p>
                <span className="bg-[#1ceff4] text-[#1C1C1C] px-3 py-1 rounded-full text-sm">
                    {user?.role || 'unknown'}
                </span>
            </div>
        </div>
    </div>
            {/* Welcome Message */}
            <div className="py-10">
                <h2 className="mb-4">Welcome Back!</h2>
                <p>Hello {user.name || 'thief'}, your account is active and ready to use.</p>
            </div>
        </div>
    );
}