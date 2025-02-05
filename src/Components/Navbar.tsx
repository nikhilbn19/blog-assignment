'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 

const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-75 fixed-top shadow">
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand text-light fw-bold fs-4" href="/">
                   Blogs App 
                </Link>

                {/* Hide Create Button on Create Page */}
                {pathname !== '/blog/Createblog' && (
                    <button className="btn btn-outline-light fw-bold" onClick={() => router.push('/blog/Createblog')}>
                        ✍️ Create New Blog
                    </button>
                )}

                {/* Navbar Toggle Button (for mobile) */}
                <button className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light fw-bold" href="/">🏠 Home</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
