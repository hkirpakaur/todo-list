import React, { useState, useEffect } from 'react';

const QuoteCard = () => {
    const [quote, setQuote] = useState("");

    const fetchQuote = async () => {
        try {
            const response = await fetch("https://api.kanye.rest/text");
            const data = await response.text();
            setQuote(data);
        } catch (error) {
            console.log(error);
            setQuote("Failed to fetch quote.");
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="card h-60 w-75 bg-base-100 card-md shadow-sm">
            <div className="card-body">
                <h2 className="card-title">💬 Quote of the Day</h2>
                <p>"{quote}"</p>
                <div className="justify-end card-actions">
                    <button className="btn btn-soft btn-info" onClick={fetchQuote}>New Quote</button>
                </div>
            </div>
        </div>
    )
};

export default QuoteCard;
