import React, { useState, useEffect } from "react";

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async (page) => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`http://localhost:8080/api/task?page=${page}`);
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await res.json();
            setData(result.tasks || result);
            setTotalPages(result.totalPages || Math.ceil(100 / 10)); 
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const updateData = (id, completed) => {
        const newData = data.map((item) =>
            item.id === id ? { ...item, completed: !completed } : item
        );
        setData(newData);
    };

    const removeData = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error...</div>;
    }

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => updateData(item.id, item.completed)}
                        />
                        {item.title}
                        <button onClick={() => removeData(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default Page;
