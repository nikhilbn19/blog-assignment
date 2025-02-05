import React from 'react';

interface DeleteBlogProps {
    id: number;
    onDelete: (id: number) => void;
}

const DeleteBlog: React.FC<DeleteBlogProps> = ({ id, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            onDelete(id);
        }
    };

    return (
        <button className="btn btn-danger mt-2" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteBlog;
