import React from "react";
import ComingSoon from "./subcomponents/comingSoon";

export default function blogPage() {
  return (
    <div className="blog">
      <div className="blog__comingSoon">
        <ComingSoon />
      </div>
    </div>
  );
}
