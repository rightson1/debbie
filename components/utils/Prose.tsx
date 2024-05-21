import React from "react";

export const Prose = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" prose text-white prose-p:text-white prose-ul:text-white prose-a:text-blue-600 prose-headings:text-white  prose-blockquote:text-white prose-strong:text-white prose-em:text-white">
      {children}
    </div>
  );
};
