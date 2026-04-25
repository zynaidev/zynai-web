import type { ComponentPropsWithoutRef } from "react";

export function ZynaiCubeIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="zynai-cube-top" x1="8" x2="21" y1="4" y2="12">
          <stop stopColor="#BDFF00" />
          <stop offset="1" stopColor="#A3DB01" />
        </linearGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="18"
          id="zynai-cube-glow"
          width="18"
          x="5"
          y="1"
        >
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <path
        d="M14 3.5 24 9.25 14 15 4 9.25 14 3.5Z"
        fill="#BDFF00"
        filter="url(#zynai-cube-glow)"
        opacity="0.28"
      />
      <path
        d="M14 3.5 24 9.25 14 15 4 9.25 14 3.5Z"
        fill="url(#zynai-cube-top)"
        stroke="#6F9600"
        strokeLinejoin="round"
      />
      <path
        d="M4 9.25 14 15v9.5L4 18.75v-9.5Z"
        fill="#1A3A4A"
        stroke="#102934"
        strokeLinejoin="round"
      />
      <path
        d="M24 9.25 14 15v9.5l10-5.75v-9.5Z"
        fill="#2A4A5A"
        stroke="#183441"
        strokeLinejoin="round"
      />
      <path
        d="M14 15v9.5M4 9.25 14 15l10-5.75"
        stroke="#0D222C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
