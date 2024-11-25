import { Link, useNavigate } from 'react-router-dom';

import PropTypes, { string } from 'prop-types';

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: string,
};

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = 'text-blue-500';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
