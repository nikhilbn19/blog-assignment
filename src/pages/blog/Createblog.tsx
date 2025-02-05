'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/Components/Navbar';

interface Blog {
    id: number;
    author: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
}

const Createblog: React.FC = () => {
    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [data, setData] = useState<Blog[]>([]);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData: Blog[] = JSON.parse(localStorage.getItem('myData') || '[]');
            setData(savedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('myData', JSON.stringify(data));
    }, [data]);

    const addData = () => {
        setSuccessMsg(null);
        setErrorMsg(null);

        if (!author || !title || !description) {
            setErrorMsg('❌ Please fill in all required fields.');
            return;
        }

        const currentDate = new Date().toLocaleDateString();
        const newData: Blog = {
            id: data.length + 1,
            author,
            date: currentDate,
            title,
            description,
            imageUrl: imageUrl || '/default-image.jpg'
        };

        setData([...data, newData]);
        setSuccessMsg('✅ Blog successfully published! 🎉');
        
        // Clear input fields after success
        setAuthor('');
        setTitle('');
        setDescription('');
        setImageUrl('');
    };

    return (
        <div>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow" style={{ width: '40rem' }}>
                    <h2 className="text-center text-primary fw-bold">✍️ Create a New Blog</h2>

                    {/* ✅ Display error message */}
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    {/* ✅ Display success message */}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    <input type="text" className="form-control my-2" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <input type="text" className="form-control my-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="form-control my-2" placeholder="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" className="form-control my-2" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                    <button className="btn btn-success w-100 fw-bold" onClick={addData}>🚀 Publish Blog</button>

                    {/* Display image */}
                    <div className="mt-3">
                        <img 
                            src={imageUrl || '/default-image.jpg'} 
                            alt={title} 
                            className="img-fluid my-2 rounded shadow" 
                            onError={(e) => (e.currentTarget.src = '/default-image.jpg')} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Createblog;
