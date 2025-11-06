import Styles from './PendingRequestsSkeleton.module.css';

export default function PendingRequestsSkeleton() {
    return (
        <div className={Styles['pending_requests_skeleton']}>
            {[...Array(10)].map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
}

const SkeletonCard = () => {
    return (
            <button className={Styles['teacher_event_card']}>
                <div className={Styles['teacher_event_photo_container']}>
                    
                </div>
            </button>
    );

}