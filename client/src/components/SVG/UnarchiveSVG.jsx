import React from "react";

const UnarchiveSVG = ({ classes }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${classes}`}
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.706 5.292l-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM14 14v3h-4v-3H7l5-5l5 5h-3z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UnarchiveSVG;
