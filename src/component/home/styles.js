import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    media: {
        height: 0,
        paddingTop: '40%',
        marginBottom: '10px',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    border: {
        border: 'solid',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
        // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    overlay2: {
        position: 'absolute',
        top: '20px',
        right: '5px',
        color: 'white',
    },
    grid: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        justifyContent: 'center',
        margin: '5px',
        fontFamily: 'Mulish',
    },
    title: {
        padding: '0 8px',
        fontFamily: 'Mulish',
    },
    typo: {
        padding: '0 16px',
        fontFamily: 'Mulish',
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        margin: '0 0 0 100px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    splitscreen: {
        display: 'flex',
        paddingBottom: '10px',
    },
    left: {
        flex: '1',
    },
    right: {
        flex: '1',
    },
    topHeading: {
        fontFamily: 'Mulish',
    }
});