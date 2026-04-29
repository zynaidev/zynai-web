export function ZynaiCubeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2.5 24 8.25v11.5L14 25.5 4 19.75V8.25L14 2.5Z"
        stroke="var(--accent)"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M4.5 8.5 14 14m0 0 9.5-5.5M14 14v11"
        stroke="var(--accent)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path
        d="m9 11.25 5-2.9 5 2.9v5.5l-5 2.9-5-2.9v-5.5Z"
        fill="var(--accent)"
        fillOpacity="0.16"
        stroke="var(--accent)"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
}
