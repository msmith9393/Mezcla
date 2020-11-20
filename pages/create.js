/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
    Photo,
    NewRecipe,
    Ingredients,
    Instructions,
    FinalDetails,
} from '../components/create-form';
import Layout from '../components/layout';

function getTime(hours, minutes) {
    let result = '';

    if (hours !== '0') {
        result += hours;

        if (hours === '1') {
            result += ' hour';
        } else {
            result += ' hours';
        }
    }

    if (minutes !== '0') {
        result += ` ${minutes}`;

        if (minutes === '1') {
            result += ' minute';
        } else {
            result += ' minutes';
        }
    }

    return result.trim();
}

const CREATE_RECIPE = gql`
    mutation createRecipe($name: String, $description: String, $ingredients: [String], $instructions: [String], $activeTime: String, $totalTime: String, $serves: String, $level: String, $author: String, $email: String, $imageUrl: String) {
        createRecipe(name: $name, description: $description, ingredients: $ingredients, instructions: $instructions, activeTime: $activeTime, totalTime: $totalTime, serves: $serves, level: $level, author: $author, email: $email, imageUrl: $imageUrl) {
            slug
        }
    }
`;

export default function Create() {
    const router = useRouter();
    const [createRecipe] = useMutation(CREATE_RECIPE);
    const [picture, setPicture] = useState({});
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
    const [session] = useSession();
    const [error, setError] = useState(false);

    const steps = [
        {
            slug: 'photo',
            stepTitle: 'Photo Time',
            tagLine: 'Max Size 500 KB, recommended dimensions 1200px X 795px',
            Component: Photo,
            props: {
                picture,
                setPicture,
            },
            validate: {
                picture,
            },
        },
        {
            slug: 'new-recipe',
            stepTitle: 'New Recipe',
            tagLine: 'What should we call your new recipe? Tell us a little story about your recipe in the description!',
            Component: NewRecipe,
            props: {
                title,
                description,
                setTitle,
                setDescription,
            },
            validate: {
                title,
                description,
            },
        },
        {
            slug: 'ingredients',
            stepTitle: 'Ingredients',
            tagLine: 'List out all the delicious ingredients of your recipe on a new line!',
            Component: Ingredients,
            props: {
                ingredients,
                setIngredients,
            },
            validate: {
                ingredients,
            },
        },
        {
            slug: 'instructions',
            stepTitle: 'Instructions',
            tagLine: 'Instruct us how to prepare your masterpiece!',
            Component: Instructions,
            props: {
                instructions,
                setInstructions,
            },
            validate: {
                instructions,
            },
        },
        {
            slug: 'final-details',
            stepTitle: 'Final Details',
            tagLine: 'Let\'s wrap up with a few final details!',
            Component: FinalDetails,
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
            validate: {
                serves,
                activeTimeHours,
                activeTimeMinutes,
                totalTimeHours,
                totalTimeMinutes,
            },
        },
    ];

    const hasError = () => {
        const { validate } = steps[activeStep];
        const keys = Object.keys(validate);

        for (let i = 0; i < keys.length; i += 1) {
            if (!validate[keys[i]]) {
                setError(true);
                return true;
            }
        }

        setError(false);
        return false;
    };

    const submitForm = () => {
        if (activeStep !== steps.length - 1) {
            return;
        }

        if (hasError()) {
            return;
        }

        axios.post('/api/upload', {
            fileName: picture.name,
            fileType: picture.type,
        }).then((response) => {
            const { returnData } = response.data.data;
            const { signedRequest } = returnData;
            const imageUrl = returnData.url;

            const options = {
                headers: {
                    'Content-Type': picture.type,
                },
            };

            axios.put(signedRequest, picture, options)
                .then(() => {
                    const activeTime = getTime(activeTimeHours, activeTimeMinutes);
                    const totalTime = getTime(totalTimeHours, totalTimeMinutes);

                    createRecipe({
                        variables: {
                            name: title,
                            description,
                            instructions: instructions.split('\n'),
                            ingredients: ingredients.split('\n'),
                            activeTime,
                            totalTime,
                            serves,
                            level,
                            author: session.user.name,
                            email: session.user.email,
                            imageUrl,
                        },
                    }).then(({ data }) => {
                        const { slug } = data.createRecipe;

                        router.push(`/recipes/${slug}`);
                    });
                });
        }).catch((err) => {
            console.error(`ERROR${ JSON.stringify(err)}`);
        });
    };

    return (
        <Layout
            pageTitle="Create"
            pageDescription="Create a new recipe"
            image=""
        >
            <div>
                <form onSubmit={activeStep === steps.length - 1 ? submitForm : null}>
                    {steps.map(({
                        stepTitle, slug, tagLine, Component, props,
                    }, index) => {
                        if (activeStep !== index) {
                            return null;
                        }

                        return (
                            <div
                                key={slug}
                                className="container"
                            >
                                <img
                                    src={`create-recipe/${slug}.png`}
                                    alt={`${stepTitle} icon`}
                                    className="image"
                                />
                                <h2 className="center headingSpecial no-margin">{stepTitle}</h2>
                                <p className="center">{tagLine}</p>
                                <Component
                                    error={error}
                                    {...props}
                                />
                            </div>
                        );
                    })}
                    <div className="button-container">
                        {activeStep !== 0 && (
                            <button
                                type="button"
                                className="button link-button button-with-icon"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setActiveStep(activeStep - 1);
                                }}
                            >
                                <img
                                    alt="previous icon"
                                    src="/previous.png"
                                    style={{
                                        width: 24,
                                        position: 'absolute',
                                        top: 10,
                                        left: 22,
                                    }}
                                />
                                <span>Previous</span>
                            </button>
                        )}
                        {activeStep !== steps.length - 1 && (
                            <button
                                type="button"
                                className="button link-button button-with-icon"
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (hasError()) {
                                        return;
                                    }

                                    setActiveStep(activeStep + 1);
                                }}
                            >
                                <span style={{
                                    paddingRight: 16,
                                }}
                                >
                                    Next
                                </span>
                                <img
                                    alt="next icon"
                                    src="/next.png"
                                    style={{
                                        width: 24,
                                        position: 'absolute',
                                        right: 40,
                                        top: 10,
                                    }}
                                />
                            </button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <button
                                type="button"
                                className="button link-button button-with-icon"
                                onClick={submitForm}
                            >
                                <span style={{
                                    paddingRight: 24,
                                }}
                                >
                                    Submit
                                </span>
                                <img
                                    alt="submit icon"
                                    style={{
                                        width: 34,
                                        position: 'absolute',
                                        top: 2,
                                        right: 28,
                                    }}
                                    src="/submit.png"
                                />
                            </button>
                        )}
                        {error && (
                            <div className="error">
                                {activeStep === 0
                                    ? 'Please upload one file under 500 KB'
                                    : 'Please fill out all fields!'}
                            </div>
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
