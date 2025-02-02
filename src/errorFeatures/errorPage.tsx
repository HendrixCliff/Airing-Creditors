import { Link } from 'react-router-dom';

 const ErrorPage = () => {
  return (
    <div>
          <h2>Something went wrong. Please try again later.</h2>
          <Link to='/authenticate'>Go Back</Link>
        </div>
      );
}

export default ErrorPage