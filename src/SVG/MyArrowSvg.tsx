import React from 'react';

// The component now accepts props for size, color, and additional classNames.
const MyArrowSvg = ({ size = 90, color = 'white', className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90" // The viewBox is adjusted to the optimized paths.
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Allows passing Tailwind classes, etc.
    >
      {/* The <g> tag and transform have been removed by the optimizer. */}
      {/* The fill color is now controlled by the `color` prop. */}
      <path
        d="M80.22 73.89c-.2.01-.39 0-.58-.06a.88.88 0 0 1-.5-.4l-8.73-8.73a1 1 0 1 1 1.41-1.42l7.41 7.41c1.64-15.45-4.18-28.44-16.19-35.85a1 1 0 1 1 1.05-1.7c12.92 7.95 19.06 19.54 19.06 33.46 0 1.5-.08 3.04-.22 4.6l6.94-6.94a1 1 0 1 1 1.41 1.42l-8.91 8.91c-.13.13-.3.2-.48.25-.05 0-.1 0-.14.01z"
        fill={color}
      />
      <path
        d="M32.15 16.91c10.52 2.14 19.86 8.4 23.81 15.97.93 1.79 1.38 3.91 1.38 6.18 0 3.57-1.12 7.5-3.28 11.09-2.34 3.88-5.58 6.9-9.15 8.52-3.69 1.68-7.28 1.66-10.12-.05-5.73-3.45-6.42-12.87-1.53-20.99.01-.01 2.1-3.48 8.16-8.03a1 1 0 0 1 .94 1.77c-2.85 1.53-5.48 4.13-7.4 7.31-4.31 7.18-3.93 15.35.85 18.24 2.26 1.36 5.19 1.34 8.27-.06 3.2-1.45 6.13-4.2 8.26-7.73 3.19-5.3 3.91-11.31 1.84-15.32-3.68-7.05-12.48-12.91-22.43-14.93C20.71 16.63 10.02 19.2 1.63 26.11a1 1 0 1 1-1.27-1.54C9.22 17.27 20.51 14.55 32.15 16.91z"
        fill={color}
      />
    </svg>
  );
};

export default MyArrowSvg;