import React from 'react';
import { useNavigate } from 'react-router-dom';
import {PATHS} from "../../helpers/constants.ts";

export function ErrorNotFound() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="container">
                <div className="message message-centered">
                    <h1 className="error-title">404</h1>
                    <h2 className="error-subtitle">Page Not Found</h2>
                    <p className="error-description">
                        Page not exist
                    </p>
                    <button
                        className="btn error-button"
                        onClick={() => navigate(PATHS.ROOT)}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorNotFound;
