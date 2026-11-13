import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import modules from '../../../data/app/modules';

function Redirect(props) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(modules(location.pathname).path);
    }, []);
}

export default Redirect;