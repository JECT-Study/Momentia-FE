const Check = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.1264 16.5452C10.8664 16.5452 10.6164 16.4452 10.4264 16.2652L6.30635 12.2652C5.90635 11.8852 5.89636 11.2452 6.28636 10.8552C6.66636 10.4552 7.30637 10.4452 7.69637 10.8352L11.0264 14.0652L16.0364 7.77516C16.3764 7.34516 17.0064 7.27516 17.4464 7.61516C17.8764 7.95516 17.9464 8.58516 17.6064 9.02516L11.9064 16.1752C11.7264 16.3952 11.4664 16.5352 11.1864 16.5552C11.1664 16.5552 11.1464 16.5552 11.1264 16.5552V16.5452Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Check;
