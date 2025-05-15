import React, { useState, useEffect } from "react";
import styled from "styled-components";

const theme = {
    primary: "#4A90E2",
    secondary: "#F5F7FA",
    danger: "#E74C3C",
    text: "#2C3E50",
    border: "#E1E8ED",
    success: "#2ECC71",
    hover: "#3498DB",
};

const Container = styled.div`
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 800px;
    margin: 2rem auto;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    color: ${theme.text};
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    position: relative;
    
    &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background-color: ${theme.primary};
        border-radius: 2px;
    }
`;

const TaskList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 2rem 0;
`;

const TaskItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border: 1px solid ${theme.border};
    border-radius: 8px;
    margin-bottom: 0.75rem;
    background-color: ${theme.secondary};
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    div {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1rem;
        color: ${theme.text};
    }
`;

const Checkbox = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.primary};
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    &:checked {
        background-color: ${theme.primary};
        border-color: ${theme.primary};
    }

    &:checked:after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 14px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover {
        border-color: ${theme.hover};
    }
`;

const DeleteButton = styled.button`
    background-color: transparent;
    color: ${theme.danger};
    border: 1px solid ${theme.danger};
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${theme.danger};
        color: white;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
`;

const PaginationButton = styled.button`
    background-color: ${theme.primary};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &:disabled {
        background-color: ${theme.border};
        cursor: not-allowed;
        opacity: 0.7;
    }

    &:hover:enabled {
        background-color: ${theme.hover};
        transform: translateY(-1px);
    }

    &:active:enabled {
        transform: translateY(0);
    }
`;

const LoadingContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 1.2rem;
    color: ${theme.text};
`;

const ErrorContainer = styled(LoadingContainer)`
    color: ${theme.danger};
`;

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
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    if (error) {
        return <ErrorContainer>Error loading tasks. Please try again later.</ErrorContainer>;
    }

    return (
        <Container>
            <Title>Task List</Title>
            <TaskList>
                {data.map((item) => (
                    <TaskItem key={item.id}>
                        <div>
                            <Checkbox
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => updateData(item.id, item.completed)}
                            />
                            {item.title}
                        </div>
                        <DeleteButton onClick={() => removeData(item.id)}>Delete</DeleteButton>
                    </TaskItem>
                ))}
            </TaskList>
            <PaginationContainer>
                <PaginationButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </PaginationButton>
                <PaginationButton disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    Next
                </PaginationButton>
            </PaginationContainer>
        </Container>
    );
};

export default Page;
