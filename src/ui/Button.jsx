import PropTypes, { string } from 'prop-types';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default function Button({ children, type, onClick, disabled }) {
  const base =
    'inline-block text-sm rounded-full bg-sky-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-sky-300 focus:bg-sky-300 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
    danger:
      'inline-block text-sm rounded-full border-2 bg-red-500 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-red-700 focus:outline-none  disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
    round: 'px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  };

  if (onClick)
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
