import Styles from './SearchBar.module.css';
const searchIcon = '/Graphics/icons/lupa.png';

export default function SearchBar({ value = '', onChange = () => {}, placeholder = 'Buscar...' }) {
  return (
    <div className={Styles['search-bar_section']}>
      <div className={Styles['search-bar_container']}>
        <img src={searchIcon} className={Styles['search-icon']} alt="buscar" />
        <input
          type="text"
          placeholder={placeholder}
          className={Styles['search-input']}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}