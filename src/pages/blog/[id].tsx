import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Blog {
    id: number;
    title: string;
    description: string;
    author: string;
    imageUrl: string;
    date: string;
}

const BlogDetails: React.FC = () => {
    const [blogDetail, setBlogDetail] = useState<Blog | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;
        const blogs: Blog[] = JSON.parse(localStorage.getItem('myData') || '[]');
        const selectedBlog = blogs.find(blog => blog.id === Number(id));
        setBlogDetail(selectedBlog || null);
    }, [id]);

    if (!blogDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container bg-light" style={{ marginTop: '5rem' }}>
            <Navbar />
            <div className="card mt-5">
                <img src={blogDetail.imageUrl} style={{ maxWidth: '100%', maxHeight: '300px' }} className="card-img-top" alt="Blog" />
                <div className="card-body">
                    <h1 className="card-title">{blogDetail.title}</h1>
                    <p className="card-text">{blogDetail.description}</p>
                    <p className="card-text">Author: {blogDetail.author}</p>
                    <p className="card-text">Date: {blogDetail.date}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
