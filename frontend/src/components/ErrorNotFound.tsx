import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ErrorNotFound() {
    const navigate = useNavigate();

    return (
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="container">
                <div className="message" style={{textAlign: 'center', padding: '60px 40px'}}>
                    <h1 style={{fontSize: '4rem', margin: '0', color: '#ff6b6b'}}>404</h1>
                    <h2 style={{fontSize: '2rem', margin: '20px 0', color: 'white'}}>Page Not Found</h2>
                    <p style={{fontSize: '1.2rem', margin: '20px 0', color: 'rgba(255, 255, 255, 0.8)'}}>
                        The page doesn't exist, go home
                    </p>
                    <button
                        className="btn"
                        onClick={() => navigate('/')}
                        style={{marginTop: '30px', padding: '15px 30px'}}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorNotFound;
