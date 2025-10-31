import Styles from './SearchBar.module.css';
const searchIcon = '/Graphics/icons/lupa.png';

export default function SearchBar() {
  return (
    <div className={Styles['search-bar_section']}>
        <div className={Styles['search-bar_container']}>
            <img src={searchIcon} className={Styles['search-icon']} />
            <input type="text" placeholder="Search..." className={Styles['search-input']} />
        </div>
    </div>
  );
}