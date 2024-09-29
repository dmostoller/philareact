// src/components/Tooltip.tsx

import { useState, ReactNode } from "react";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";
import { Transition } from "@headlessui/react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use useState instead of useRef
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: "top-start"
  });

  // Update the popper when the tooltip opens
  const handleMouseEnter = () => {
    setIsOpen(true);
    if (update) {
      update();
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <Transition
            show={isOpen}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="z-50 w-64 p-2 mt-2 text-sm bg-dark-slate-700 rounded-lg shadow-lg"
            >
              {content}
            </div>
          </Transition>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
