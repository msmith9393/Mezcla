import styles from './recipe-card.module.css';
import classNames from 'classnames';

export default function RecipeCard({ name, image, liked }) {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <h4 className={classNames('headingLg', styles.title)}>{name}</h4>
            <span>
                <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.17 21.91' className={classNames(styles.likedIcon, {
                    [styles.likedIconLiked]: liked,
                })}><defs></defs><title>heart</title><path d='M15.78,7.92a5.14,5.14,0,0,1,5-3.5c4.17-.2,5.65,3.43,6,5a6,6,0,0,1-.34,3.83,14.12,14.12,0,0,1-4.3,6.32,32.68,32.68,0,0,1-6.35,4.71S7.64,19,5.46,13.93C3.51,9.4,6,5.77,8.62,4.76S14.87,4.89,15.78,7.92Z' transform='translate(-3.76 -3.41)'/></svg>
            </span>
        </div>
    );
}
