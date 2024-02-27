const Error = ({ text, getJobs }) => {
  return (
    <div className="error-container">
      <p>
        Üzgünüz verilere erişirken bir hata oluştu :/ <span>{text}</span>
      </p>

      <button onClick={getJobs} className="ui-btn">
        <span>Tekrar Dene</span>
      </button>
    </div>
  );
};

export default Error;
