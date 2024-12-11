const ArrowRight = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2905 20.6925C11.4905 20.8825 11.7405 20.9825 12.0005 20.9825L11.9905 20.9925C12.2505 20.9925 12.5005 20.9025 12.7005 20.7025L20.7005 12.7025C20.7928 12.6103 20.8632 12.5047 20.9118 12.392C20.9684 12.2668 21 12.1281 21 11.9824C21 11.6439 20.8295 11.3432 20.5701 11.1621L12.7005 3.2925C12.3105 2.9025 11.6805 2.9025 11.2905 3.2925C10.9005 3.6825 10.9005 4.3125 11.2905 4.7025L17.5705 10.9824H4C3.45 10.9824 3 11.4324 3 11.9824C3 12.5324 3.45 12.9824 4 12.9824H17.5906L11.2905 19.2825C10.9005 19.6725 10.9005 20.3025 11.2905 20.6925Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRight;
