import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';

/**
 * Выводим один семинар отдельно
 */
const SeminarDetails = () => {
    const { id } = useParams();
    const { data: seminar, error, isPending } = useFetch("http://localhost:7000/seminars/" + id);

    return (
        <>
            <section>
                {isPending && <p>Loading user details...</p>}

                {error && <p>{error}</p>}

                {seminar && (
                    <>
                        <h1>Seminar {seminar.id} details</h1>
                        <h2>{seminar.title}</h2>
                        <p>{seminar.photo}</p>
                        <p>{seminar.description}</p>
                        <p>{seminar.date} : {seminar.time}</p>
                    </>
                )}
            </section>
        </>
    );
};

export default SeminarDetails;