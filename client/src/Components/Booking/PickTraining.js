import React, { useEffect } from 'react';
import HTTP from '../../Utils/HTTP';
import './Window.scss';

function PickTraining(props) {
    const [programs, setPrograms] = React.useState([]);
    useEffect(() => {
        const abort = new AbortController();

        (async () => {
            const response = await HTTP.GET('/programs', abort.signal);
            let newState = [];
            let tracker = [];
            response.data.forEach(program => {
                if (!tracker.includes(program.program)) {
                    newState.push(program);
                    tracker.push(program.program);
                }
            });

            setPrograms(newState);
        })();

        return () => abort.abort();
    }, []);

    const selectProgram = (program) => {
        props.selectProgram(program);
        props.setActivePage(1);
    }

    return (
        <div className="Booking-Window">
            <h3>Pick Training</h3>

            {programs.map((program, i) => {
                return (
                    <div className="category" key={i} onClick={() => selectProgram(program)}>
                        <p>{program.program}</p>
                        <span className="material-icons">arrow_right</span>
                    </div>
                );
            })}
        </div>
    )
}

export default PickTraining;