import styles from './search.module.css';

function Search() {
    return (
        <form role='search' action='/' method='get' className={styles.container}>
            <label htmlFor='header-search'>
                <span className={styles.hidden}>Search</span>
            </label>
            <input type='search' name='search' className={styles.search} />
            <button className={styles.submit} type='submit'>
                <span className={styles.hidden}>Submit Search</span>
            </button>
        </form>
    );
}

export default Search;
