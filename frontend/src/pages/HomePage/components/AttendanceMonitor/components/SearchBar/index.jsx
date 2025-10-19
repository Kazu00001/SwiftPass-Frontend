import Styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={Styles['search-bar_section']}>
        <div className={Styles['search-bar_container']}>
            <input type="text" placeholder="Search..." className={Styles['search-input']} />
        </div>
    </div>
  );
}