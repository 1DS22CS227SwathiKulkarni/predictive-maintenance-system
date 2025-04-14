import React, { useState, useRef, useEffect } from "react";

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight =
          contentRef.current.scrollHeight + "px";
        contentRef.current.style.opacity = 1;
      } else {
        contentRef.current.style.maxHeight = "0px";
        contentRef.current.style.opacity = 0;
      }
    }
  }, [isOpen]);

  return (
    <div className="collapsible-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      <div className={`section-body ${isOpen ? "open" : ""}`} ref={contentRef}>
        <div className="section-content">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
