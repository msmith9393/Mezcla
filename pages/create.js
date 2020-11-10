/* elint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Layout from '../components/layout';
import {
    NewRecipe,
    Ingredients,
    Instructions,
    FinalDetails,
} from '../components/create-form';

export default function Create() {
    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [serves, setServes] = useState('');
    const [activeTimeHours, setActiveTimeHours] = useState('');
    const [activeTimeMinutes, setActiveTimeMinutes] = useState('');
    const [totalTimeHours, setTotalTimeHours] = useState('');
    const [totalTimeMinutes, setTotalTimeMinutes] = useState('');
    const [level, setLevel] = useState('easy');

    const steps = [
        {
            slug: 'new-recipe',
            stepTitle: 'New Recipe',
            tagLine: "What should we call your new recipe? Tell us a little story about your recipe in the description!", Component: NewRecipe,
            props: {
                title,
                description,
                setTitle,
                setDescription,
            },
        },
        {
            slug: 'ingredients',
            title: 'Ingredients',
            tagLine: "List out all the delicious ingredients of your recipe on a new line!",
            Component: Ingredients,
            props: {
                ingredients,
                setIngredients,
            },
        },
        {
            slug: 'instructions',
            title: 'Instructions',
            tagLine: "Instruct us how to prepare your masterpiece!", Component: Instructions,
            props: {
                instructions,
                setInstructions,
            },
        },
        {
            slug: 'final-details',
            title: 'Final Details',
            tagLine: 'Let\'s wrap up with a few final details!', Component: FinalDetails,
            props: {
                serves,
                activeTimeHours,
                activeTimeMinutes,
                totalTimeHours,
                totalTimeMinutes,
                setServes,
                setLevel,
                setActiveTimeHours,
                setTotalTimeHours,
                setActiveTimeMinutes,
                setTotalTimeMinutes,
            },
        },
    ];

    const submitForm = () => {
        if (activeStep !== steps.length - 1) {
            return;
        }
    }

    return (
        <Layout
            pageTitle="Create"
            pageDescription="Create a new recipe"
            image=""
        >
            <div>
                <form onSubmit={activeStep === steps.length - 1 ? submitForm : null}>
                    {steps.map(({ stepTitle, slug, tagLine, Component, props }, index) => {
                        if (activeStep !== index) {
                            return null;
                        }

                        return (
                            <div
                                key={slug}
                                className="container">
                                <img
                                    src={`create-recipe/${slug}.png`}
                                    alt={`${stepTitle} icon`}
                                    className="image" />
                                    <h2 className="center headingSpecial no-margin">{stepTitle}</h2>
                                    <p className="center">{tagLine}</p>
                                    <Component {...props} />
                            </div>
                        );
                    })}
                    <div className="button-container">
                        {activeStep !== 0 && (
                            <button
                                type="button"
                                className="button link-button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setActiveStep(activeStep - 1);
                                }}>
                                Previous
                            </button>
                        )}
                        {activeStep !== steps.length - 1 && (
                            <button
                                type="button"
                                className="button link-button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setActiveStep(activeStep + 1);
                                }}>
                                Next
                            </button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <button
                                type="button"
                                className="button link-button"
                                onClick={submitForm}>
                                Submit
                            </button>
                        )}
                    </div>
                </form>
                <style jsx>
                    {`
                    .button-container,
                    .container {
                        max-width: 800px;
                        margin: 16px auto;
                        text-align: center;
                    }

                    .image {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                    }
                `}
                </style>
            </div>
        </Layout>
    );
}
