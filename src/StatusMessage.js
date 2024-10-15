function StatusMessage({ isOnline }) {
    return (
      <div>
        {isOnline ? <p>You are online!</p> : <p>You are offline.</p>}
      </div>
    );
  }
  
  export default StatusMessage;
  