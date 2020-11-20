import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './recipe-card.module.css';
// import Heart from './heart';

export default function RecipeCard({
    name,
    slug,
    imageUrl,
}) {
    return (
        <Link href={`/recipes/${slug}`}>
            <a className={styles.card}>
                <img src={imageUrl} alt={name} className={styles.image} />
                <h4 className={classNames('headingLg', styles.title)}>{name}</h4>
                {/* <Heart liked={liked} /> */}
            </a>
        </Link>
    );
}

RecipeCard.propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
