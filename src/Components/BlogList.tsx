'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/Components/Navbar';
import Link from 'next/link';

interface Blog {
    id: number;
    title: string;
    description: string;
    author: string;
    imageUrl: string;
    date: string;
}

const BlogList: React.FC = () => {
    const [data, setData] = useState<Blog[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const blogs: Blog[] = JSON.parse(localStorage.getItem('myData') || '[]');
        setData(blogs);
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const updatedBlogs = data.filter(blog => blog.id !== id);
            setData(updatedBlogs);
            localStorage.setItem('myData', JSON.stringify(updatedBlogs));
        }
    };

    const filteredData = searchQuery.trim()
        ? data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : data;

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '5rem' }}>
                {/* Search Bar */}
                <input
                    type="text"
                    className="form-control my-3 border border-primary"
                    placeholder="🔍 Search Blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="row">
                    {filteredData.map((item) => (
                        <div key={item.id} className="col-md-4">
                            <div className="card mb-4 shadow-sm border-0 blog-card">
                                <img
                                    src={item.imageUrl?.trim() ? item.imageUrl : '/default-image.jpg'}
                                    className="card-img-top rounded"
                                    alt={item.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-bold">{item.title}</h5>
                                    <p className="card-text text-muted">
                                        {item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}
                                    </p>
                                    <p className="small text-secondary">📅 {item.date} | ✍️ {item.author}</p>
                                    <div className="d-flex justify-content-between mt-2">
                                        <Link href={`/blog/${item.id}`}>
                                            <button className="btn btn-sm btn-outline-primary">📖 Read More</button>
                                        </Link>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                                            🗑 Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS Styling */}
            <style jsx>{`
                .blog-card:hover {
                    transform: translateY(-5px);
                    transition: all 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default BlogList;
