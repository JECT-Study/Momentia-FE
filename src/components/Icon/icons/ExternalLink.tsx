const ExternalLink = ({ className }: { className?: string }) => {
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
        d="M12.5003 11.283C12.6803 11.443 12.8903 11.523 13.1103 11.523C13.3503 11.523 13.5903 11.433 13.7603 11.243L17.979 6.71677L18 8.90195C18.01 9.39195 18.4 9.78195 18.89 9.78195H18.9C19.39 9.77195 19.78 9.37195 19.78 8.88195L19.74 4.88195C19.73 4.39195 19.34 4.00195 18.85 4.00195H18.5176C18.4782 3.99935 18.4386 3.99935 18.3993 4.00195H14.85C14.36 4.00195 13.96 4.40195 13.96 4.89195C13.96 5.38195 14.36 5.78195 14.85 5.78195H16.4131L12.4603 10.023C12.1203 10.383 12.1403 10.953 12.5003 11.283ZM18.89 19.813H4.89C4.4 19.813 4 19.413 4 18.923V4.93297C4 4.44297 4.4 4.04297 4.89 4.04297H11.85C12.34 4.04297 12.74 4.44297 12.74 4.93297C12.74 5.42297 12.34 5.82297 11.85 5.82297H5.77V18.043H17.99V11.893C17.99 11.403 18.39 11.003 18.88 11.003C19.37 11.003 19.77 11.403 19.77 11.893V18.933C19.77 19.423 19.37 19.823 18.88 19.823L18.89 19.813Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ExternalLink;
