import React from 'react';
import './Styles/Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home({ setSelectedTab }) {
    const navigateTo = useNavigate();
    return (
        <main className="home-page">
            <img
                className="home-banner"
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/shopping_app_flsj.svg" 
                alt="Shopping APP"
            />
            <div className="welcome-text">
                <h1 className="home-title">HK Shopping App</h1>
                <p className="home-description">HK Shopping provides various products ranging from electronics to groceries so that our users can shop everything in <strong>one platform</strong>.</p>
                <button className="shop-button" onClick={() => {navigateTo("/products"); setSelectedTab(3) }}>Shop now</button>
            </div>
        </main>
    );
}