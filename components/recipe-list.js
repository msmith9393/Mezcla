import styles from './recipe-list.module.css';
import RecipeCard from './recipe-card';

export default function RecipeList({ recipes }) {
    return (
        <div className={styles.container}>
            {recipes.map((props, index) => (
                <RecipeCard key={index} {...props} />
            ))}
        </div>
    );
}
