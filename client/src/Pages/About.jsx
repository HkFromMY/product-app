import React from 'react';
import './Styles/About.css';
import Card from 'react-bootstrap/Card';

export default function About() {
    const coreValues = [
        {
            img: "https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/QA_engineers_dg5p.svg",
            value: "Quality",
            text: "We ensure the best quality of product to be provided to the customers."
        },
        {
            img: "https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Innovative_re_rr5i.svg",
            value: "Accountability",
            text: "We take responsibility for what we have provided."
        },
        {
            img: "https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Positive_attitude_re_wu7d.svg",
            value: "Passion",
            text: "We have passion to provide good product to the consumers."
        }
    ];

    return (
        <div className="about-page">
            <div className="about-text">
                <h1 className="about-title">HK Shopping APP</h1>
                <p className="about-description">
                    HK Shopping is an organization that aims to provide the internet users a platform to buy and shop various products at a fingertip.
                </p>
            </div>
            <div className="values-cards">
                {
                    coreValues.map(value => {
                        return (
                            <Card className="value-card">
                                <Card.Img 
                                    variant="top" 
                                    src={value.img}
                                    width="268"
                                    height="180"
                                />
                                <Card.Body>
                                    <Card.Title><strong>{ value.value }</strong></Card.Title>
                                    <Card.Text>
                                        { value.text }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
            
        </div>
    );
}