import Styles from './EmptyBox.module.css';

const emptyBox = 'Graphics/icons/emptyBox.png';

export default function EmptyBox() {
    return (
        <div className={Styles['empty_box']}>
            <img src={emptyBox} className={Styles['empty_box_image']} alt="" draggable="false"/>
            <h3 className={Styles['empty_box_text']}>No hay elementos</h3>
        </div>
    );
}   