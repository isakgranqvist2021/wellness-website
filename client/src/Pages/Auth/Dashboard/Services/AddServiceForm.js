import React from 'react';

const styles = {
    form: {
        width: '500px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        padding: '2rem',
        margin: '50px 0',
        borderRadius: '1rem'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1rem 0'
    },
    label: {
        display: 'block',
        marginRight: '1rem'
    },
    input: {
        display: 'block',
        padding: '.5rem',
        flexGrow: '1'
    },
    button: {
        display: 'block',
        margin: '0 0 0 auto',
        padding: '.5rem'
    }
}

function AddServiceForm() {
    return (
        <form style={styles.form}>
            <h2>Add Service</h2>
            <section style={styles.section}>
                <label style={styles.label}>Service Name</label>
                <input style={styles.input} type="text" />
            </section>
            <section style={styles.section}>
                <label style={styles.label}>Enabled (users can see this service)</label>
                <input type="checkbox" />
            </section>
            <button style={styles.button} type="button">Add Service</button>
        </form>
    );
}

export default AddServiceForm;