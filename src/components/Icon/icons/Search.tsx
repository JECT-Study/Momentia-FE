const Search = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 13.125C2.5 18.975 7.2625 23.75 13.125 23.75C15.6048 23.75 17.8879 22.8978 19.6969 21.4707L25.1127 26.8866C25.3611 27.1226 25.6713 27.2475 25.9941 27.2491C25.992 27.2491 25.9898 27.2491 25.9877 27.2491H26.0002C25.9982 27.2491 25.9961 27.2491 25.9941 27.2491C26.3168 27.2476 26.6268 27.1349 26.8752 26.8866C27.3627 26.3991 27.3627 25.6116 26.8752 25.1241L21.4607 19.7096C22.8938 17.8986 23.75 15.6107 23.75 13.125C23.75 7.2625 18.9875 2.5 13.125 2.5C7.2625 2.5 2.5 7.275 2.5 13.125ZM5 13.125C5 8.65 8.65 5 13.125 5C17.6 5 21.25 8.65 21.25 13.125C21.25 17.6 17.6 21.25 13.125 21.25C8.65 21.25 5 17.6 5 13.125Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Search;
