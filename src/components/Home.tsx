import SeminarList from './SeminarList';
import useFetch from '../useFetch';
import NProgress from 'nprogress';
import '../assets/css/nprogress.css';

const Home = (): React.JSX.Element => {
    const { data: seminars, isPending, error } = useFetch('http://localhost:7000/seminars')

    // Линия загрузки сверху
    NProgress.configure({ trickleRate: 0.08, trickleSpeed: 100 });
    isPending ? NProgress.start() : NProgress.done();

    return (
        <>
            {error && <p>{error}</p>}
            {isPending && <p>🌀 Loading...</p>}
            {seminars && <SeminarList seminars={seminars} />}
        </>
    );
};

export default Home;