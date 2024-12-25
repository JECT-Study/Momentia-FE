const Menu = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='4'
        y='6.44412'
        width='22'
        height='2.44444'
        rx='1.22222'
        fill='currentColor'
      />
      <rect
        x='4'
        y='13.7774'
        width='22'
        height='2.44444'
        rx='1.22222'
        fill='currentColor'
      />
      <rect
        x='4'
        y='21.1107'
        width='22'
        height='2.44444'
        rx='1.22222'
        fill='currentColor'
      />
    </svg>
  );
};

export default Menu;
