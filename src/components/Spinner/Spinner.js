import spinner from '../../assets/img/loading-spinner.gif';

function Spinner({ className }) {
  return (
    <div>
      <img className={className} src={spinner} alt="loading-spinner" />
    </div>
  );
}

export default Spinner;
