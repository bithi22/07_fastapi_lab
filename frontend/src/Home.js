import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [textboxes, setTextboxes] = useState([{ id: 1, value: '' }]);
    const [sum, setSum] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const navigate = useNavigate();

    const handleAddTextbox = () => {
        const newId = textboxes.length + 1;
        setTextboxes([...textboxes, { id: newId, value: '' }]);
    };

    const handleChange = (id, value) => {
        if (!isNaN(value)) {
            setShowWarning(false);
            const updatedTextboxes = textboxes.map((textbox) => {
                if (textbox.id === id) {
                    return { ...textbox, value };
                }
                return textbox;
            });
            setTextboxes(updatedTextboxes);
            updateSum(updatedTextboxes);
        } else {
            setShowWarning(true);
        }
    };

    const handleDeleteTextbox = (id) => {
        const updatedTextboxes = textboxes.filter((textbox) => textbox.id !== id);
        setTextboxes(updatedTextboxes);
        updateSum(updatedTextboxes);
    };

    const updateSum = (textboxes) => {
        const total = textboxes.reduce((acc, curr) => {
            const value = isNaN(parseInt(curr.value, 10)) ? 0 : parseInt(curr.value, 10);
            return acc + value;
        }, 0);
        setSum(total);
    };

    const handleTaskManagerClick = () => {
        navigate('/taskmanager');
    };

    return (
        <div className="home-container">
            <h1 className="welcome">Welcome</h1>
            {textboxes.map((textbox) => (
                <div key={textbox.id} className="textbox-container">
                    <input
                        type="text"
                        value={textbox.value}
                        onChange={(e) => handleChange(textbox.id, e.target.value)}
                    />
                    <button onClick={() => handleDeleteTextbox(textbox.id)} className="delete-button">
                        Delete
                    </button>
                </div>
            ))}
            <div className="button-group"> {/* New container for buttons */}
                <button onClick={handleAddTextbox} className="add-button">
                    Add
                </button>
                <button onClick={handleTaskManagerClick} className="taskmanager-button">
                    Go to Task Manager
                </button>
            </div>
            {showWarning && <p className="warning">Please enter numbers only.</p>}
            <p className="total" style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Total: {sum}</p>
        </div>
    );
}

export default Home;
