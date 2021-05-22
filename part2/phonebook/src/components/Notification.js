export const Notification = (messageinfo) => {
    
    const { message, type } = messageinfo.messageinfo;

    if (!message && !type) {
        return null;
    }

    if (type === 'success') {
        return <div className="success">{message}</div>;
    } else {
        return <div className="error">{message}</div>;
    }
};
