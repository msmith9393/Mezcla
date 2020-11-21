/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './create-form.module.css';

export function Photo({
    picture,
    setPicture,
}) {
    const [error, setError] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length) {
            setPicture(acceptedFiles[0]);
            setError(false);
            return;
        }
        setError(true);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        maxSize: 500000,
        maxFiles: 1,
        accept: 'image/*',
        onDrop,
    });

    return (
        <div>
            <div
                className={styles.dropzone}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {
                    isDragActive
                        ? <p>Drop the file here ...</p>
                        : <p>Drag and drop a file here, or click to select file</p>
                }
            </div>
            <div className={classNames(styles.thumbContainer, {
                [`${styles.thumbContainerWithPicture}`]: !!picture.name,
                [`${styles.thumbContainerWithError}`]: error,
            })}
            >
                {error && (
                    <div className="error">Error with photo, please check size</div>
                )}
                {picture.name && (
                    <img
                        alt={picture.name}
                        src={URL.createObjectURL(picture)}
                        className={styles.thumbnail}
                    />
                )}
            </div>
        </div>
    );
}

Photo.propTypes = {
    picture: PropTypes.object.isRequired,
    setPicture: PropTypes.func.isRequired,
};

export function NewRecipe({
    title,
    description,
    setTitle,
    setDescription,
    error,
}) {
    const titleRef = React.createRef();
    const descriptionRef = React.createRef();

    return (
        <div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    name="title"
                    className={classNames(styles.input, {
                        [styles.inputError]: error && !title,
                    })}
                    value={title}
                    ref={titleRef}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label
                    htmlFor="title"
                    className={classNames(styles.inputLabel, {
                        [styles.inputLabelFocused]: !!title,
                    })}
                    onClick={() => titleRef.current.focus()}
                >
                    Title
                </label>
            </div>
            <div className={styles.inputContainer}>
                <textarea
                    type="text-area"
                    name="description"
                    className={classNames(styles.input, styles.textArea, {
                        [styles.inputError]: error && !description,
                    })}
                    value={description}
                    ref={descriptionRef}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <label
                    htmlFor="description"
                    className={classNames(styles.inputLabel, {
                        [styles.inputLabelFocused]: !!description,
                    })}
                    onClick={() => descriptionRef.current.focus()}
                >
                    Description
                </label>
            </div>
        </div>
    );
}

NewRecipe.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    setDescription: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export function Ingredients({
    ingredients,
    setIngredients,
    error,
}) {
    const ingredientsRef = React.createRef();

    return (
        <div>
            <div className={styles.inputContainer}>
                <textarea
                    type="text-area"
                    name="ingredients"
                    className={classNames(styles.input, styles.textArea, {
                        [styles.inputError]: error && !ingredients,
                    })}
                    value={ingredients}
                    ref={ingredientsRef}
                    onChange={(event) => setIngredients(event.target.value)}
                />
                <label
                    htmlFor="ingredients"
                    className={classNames(styles.inputLabel, {
                        [styles.inputLabelFocused]: !!ingredients,
                    })}
                    onClick={() => ingredientsRef.current.focus()}
                >
                    List out ingredients
                </label>
            </div>
        </div>
    );
}

Ingredients.propTypes = {
    ingredients: PropTypes.string.isRequired,
    setIngredients: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export function Instructions({
    instructions,
    setInstructions,
    error,
}) {
    const instructionsRef = React.createRef();

    return (
        <div>
            <div className={styles.inputContainer}>
                <textarea
                    type="text-area"
                    name="instructions"
                    className={classNames(styles.input, styles.textArea, {
                        [styles.inputError]: error && !instructions,
                    })}
                    value={instructions}
                    ref={instructionsRef}
                    onChange={(event) => setInstructions(event.target.value)}
                />
                <label
                    htmlFor="instructions"
                    className={classNames(styles.inputLabel, {
                        [styles.inputLabelFocused]: !!instructions,
                    })}
                    onClick={() => instructionsRef.current.focus()}
                >
                    List out instructions
                </label>
            </div>
        </div>
    );
}

Instructions.propTypes = {
    instructions: PropTypes.string.isRequired,
    setInstructions: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export function FinalDetails({
    activeTimeHours,
    activeTimeMinutes,
    totalTimeHours,
    totalTimeMinutes,
    serves,
    setActiveTimeHours,
    setActiveTimeMinutes,
    setTotalTimeHours,
    setTotalTimeMinutes,
    setServes,
    setLevel,
    error,
}) {
    const activeTimeHoursRef = React.createRef();
    const activeTimeMinutesRef = React.createRef();
    const totalTimeHoursRef = React.createRef();
    const totalTimeMinutesRef = React.createRef();
    const servesRef = React.createRef();

    return (
        <div>
            <div className={styles.groupedInputContainer}>
                <div>
                    <h3 className="headingMd">Active Time</h3>
                    <div className={classNames(styles.inputContainer, styles.inputContainerSmall)}>
                        <input
                            type="number"
                            min="0"
                            name="activeTimeHours"
                            className={classNames(styles.input, {
                                [styles.inputError]: error && !activeTimeHours,
                            })}
                            value={activeTimeHours}
                            ref={activeTimeHoursRef}
                            onChange={(event) => setActiveTimeHours(event.target.value)}
                        />
                        <label
                            htmlFor="activeTimeHours"
                            className={classNames(styles.inputLabel, {
                                [styles.inputLabelFocused]: !!activeTimeHours,
                            })}
                            onClick={() => activeTimeHoursRef.current.focus()}
                        >
                            Hours
                        </label>
                    </div>
                    <div className={classNames(styles.inputContainer, styles.inputContainerSmall)}>
                        <input
                            type="number"
                            min="0"
                            name="activeTimeMinutes"
                            className={classNames(styles.input, {
                                [styles.inputError]: error && !activeTimeMinutes,
                            })}
                            value={activeTimeMinutes}
                            ref={activeTimeMinutesRef}
                            onChange={(event) => setActiveTimeMinutes(event.target.value)}
                        />
                        <label
                            htmlFor="activeTimeMinutes"
                            className={classNames(styles.inputLabel, {
                                [styles.inputLabelFocused]: !!activeTimeMinutes,
                            })}
                            onClick={() => activeTimeMinutesRef.current.focus()}
                        >
                            Mins
                        </label>
                    </div>
                </div>
                <div>
                    <h3 className="headingMd">Total Time</h3>
                    <div className={classNames(styles.inputContainer, styles.inputContainerSmall)}>
                        <input
                            type="number"
                            min="0"
                            name="totalTimeHours"
                            className={classNames(styles.input, {
                                [styles.inputError]: error && !totalTimeHours,
                            })}
                            value={totalTimeHours}
                            ref={totalTimeHoursRef}
                            onChange={(event) => setTotalTimeHours(event.target.value)}
                        />
                        <label
                            htmlFor="totalTimeHours"
                            className={classNames(styles.inputLabel, {
                                [styles.inputLabelFocused]: !!totalTimeHours,
                            })}
                            onClick={() => totalTimeHoursRef.current.focus()}
                        >
                            Hours
                        </label>
                    </div>
                    <div className={classNames(styles.inputContainer, styles.inputContainerSmall)}>
                        <input
                            type="number"
                            min="0"
                            name="totalTimeMinutes"
                            className={classNames(styles.input, {
                                [styles.inputError]: error && !totalTimeMinutes,
                            })}
                            value={totalTimeMinutes}
                            ref={totalTimeMinutesRef}
                            onChange={(event) => setTotalTimeMinutes(event.target.value)}
                        />
                        <label
                            htmlFor="totalTimeMinutes"
                            className={classNames(styles.inputLabel, {
                                [styles.inputLabelFocused]: !!totalTimeMinutes,
                            })}
                            onClick={() => totalTimeMinutesRef.current.focus()}
                        >
                            Mins
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.groupedInputContainer}>
                <div>
                    <h3 className="headingMd">Number of people</h3>
                    <div className={classNames(styles.inputContainer, styles.inputContainerSmall)}>
                        <input
                            type="number"
                            min="1"
                            name="serves"
                            className={classNames(styles.input, {
                                [styles.inputError]: error && !serves,
                            })}
                            value={serves}
                            ref={servesRef}
                            onChange={(event) => setServes(event.target.value)}
                        />
                        <label
                            htmlFor="serves"
                            className={classNames(styles.inputLabel, {
                                [styles.inputLabelFocused]: !!serves,
                            })}
                            onClick={() => servesRef.current.focus()}
                        >
                            Serves
                        </label>
                    </div>
                </div>
                <div>
                    <h3 className="headingMd">Difficulty Level</h3>
                    <div className={classNames(styles.inputContainer, styles.inputContainerSmall)}>
                        <select
                            name="level"
                            className={styles.dropdown}
                            onChange={(event) => setLevel(event.target.value)}
                        >
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

FinalDetails.propTypes = {
    activeTimeHours: PropTypes.string.isRequired,
    activeTimeMinutes: PropTypes.string.isRequired,
    totalTimeHours: PropTypes.string.isRequired,
    totalTimeMinutes: PropTypes.string.isRequired,
    serves: PropTypes.string.isRequired,
    setActiveTimeHours: PropTypes.func.isRequired,
    setActiveTimeMinutes: PropTypes.func.isRequired,
    setTotalTimeHours: PropTypes.func.isRequired,
    setTotalTimeMinutes: PropTypes.func.isRequired,
    setServes: PropTypes.func.isRequired,
    setLevel: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};
