import spinner from '../../assets/img/loading-spinner.gif';

function Spinner({ className }) {
  return (
    <div className={className}>
      <img src={spinner} alt="loading-spinner" />
    </div>
  );
}

export default Spinner;
