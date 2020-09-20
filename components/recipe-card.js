import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './recipe-card.module.css';
import Heart from './heart';

export default function RecipeCard({
    name,
    image,
    liked,
    slug,
}) {
    return (
        <Link href={`/recipes/${slug}`}>
            <a className={styles.card}>
                <img src={image} alt={name} className={styles.image} />
                <h4 className={classNames('headingLg', styles.title)}>{name}</h4>
                <Heart liked={liked ? liked.value : false} />
            </a>
        </Link>
    );
}

RecipeCard.propTypes = {
    name: PropTypes.string.isRequired,
    liked: PropTypes.object,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
