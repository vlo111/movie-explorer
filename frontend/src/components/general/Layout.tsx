import React from 'react';
import { Outlet } from 'react-router-dom';
import {PATHS} from "../../helpers/constants.ts";

function Layout() {
    return (
        <div className="layout-wrapper">
            <header className="header">
                <h1>Movie Explorer</h1>
                <p>Discover movies</p>
                <nav className="header-nav">
                    <a href={PATHS.ROOT}>Movies</a>
                    <a href={PATHS.NOTES}>Notes</a>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer className="footer">
                <p>Movie Explorer</p>
            </footer>
        </div>
    );
}

export default Layout;
