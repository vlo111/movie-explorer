import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div style={{minHeight: '100vh'}}>
            <header className="header">
                <h1>Movie Explorer</h1>
                <p>Discover movies</p>
            </header>
            <main>
                <Outlet />
            </main>
            <footer style={{
                textAlign: 'center',
                padding: '40px 20px',
                marginTop: '60px',
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <p style={{color: 'rgba(255, 255, 255, 0.6)', margin: 0}}>Movie Explorer</p>
            </footer>
        </div>
    );
}

export default Layout;
