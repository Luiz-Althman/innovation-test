import { Cards } from '../(components)/Cards';
import { Filter } from '../(components)/Filter';

export default function Dashboard() {
    return (
        <div className="max-w-screen-lg mx-auto px-6 my-10">
            <Filter />
            <Cards />
        </div>
    );
}
