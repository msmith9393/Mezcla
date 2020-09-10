import React from 'react';
import PropTypes from 'prop-types';
import styles from './recipe-list.module.css';
import RecipeCard from './recipe-card';

export default function RecipeList({ recipes }) {
    return (
        <div className={styles.container}>
            {recipes.map(({
                name,
                slug,
                image,
                liked,
            }) => (
                <RecipeCard
                    key={slug}
                    name={name}
                    image={image}
                    liked={liked}
                    slug={slug}
                />
            ))}
        </div>
    );
}

RecipeList.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
