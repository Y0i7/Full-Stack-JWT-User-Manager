import React from 'react';

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>
                {/* Enlace a tu GitHub con un ícono y el texto "Y0i7" */}
                <a
                    href="https://github.com/Y0i7"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        alt="GitHub"
                        style={{ width: '20px', marginRight: '8px' }}
                    />
                    Y0i7
                </a>
            </p>
        </footer>
    );
};

export default Footer;
