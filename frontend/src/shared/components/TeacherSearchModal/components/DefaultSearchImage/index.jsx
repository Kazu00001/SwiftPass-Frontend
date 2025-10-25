import Styles from './DefaultSearchImage.module.css';

const DefaultImage = './Graphics/search-modal_default-image.png';

export default function DefaultSearchImage() {
  return (
    <div className={Styles['default-search-image_container']}>
      <img 
        src={DefaultImage} 
        alt="Imagen de búsqueda" 
        className={Styles['default-search-image_image']} 
        draggable="false"
        />
        <h1 className={Styles['default-search-image_text']}>Comienza buscando a un profesor</h1>
    </div>
  );
}   