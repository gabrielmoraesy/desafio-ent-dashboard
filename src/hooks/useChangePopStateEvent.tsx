"use client";

import { useEffect } from "react";

export type UseChangePopStateEventProps = {
  onReturn: () => void;
  type: "modal" | "gallery";
};

/**
 * Custom hook that adds a popstate event listener and a MutationObserver to watch for changes in the body element's attribute.
 * The popstate event listener prevents the default behavior of the event and triggers the onReturn callback function.
 * The MutationObserver checks if a modal is open and adds or removes the popstate event listener accordingly.
 *
 * @param {object} options - The options for the hook.
 * @param {string} options.type - The type of event to handle (e.g., "modal", "gallery").
 * @param {Function} options.onReturn - The callback function to be triggered when the popstate event occurs.
 */
export function useChangePopStateEvent({
  type,
  onReturn,
}: UseChangePopStateEventProps) {
  useEffect(() => {
    /**
     * Event handler for the popstate event.
     * Prevents the default behavior of the event and triggers the onReturn callback function.
     *
     * @param {PopStateEvent} event - The popstate event object.
     */
    const onBackButtonEvent = (event: PopStateEvent) => {
      event.preventDefault();
      onReturn();
    };

    /**
     * Checks if a modal is open and adds or removes the onBackButtonEvent listener accordingly.
     */
    function checkModalOpen() {
      const conditionsToPreventDefault = {
        modal: document.body.style.pointerEvents === "none",
        gallery: document.body.classList.contains("yarl__no_scroll"),
      };

      if (conditionsToPreventDefault[type]) {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener("popstate", onBackButtonEvent);
      } else {
        window.removeEventListener("popstate", onBackButtonEvent);
      }
    }

    const attributeFilterToObserve = {
      modal: ["style"],
      gallery: ["class"],
    };

    // Create a MutationObserver to observe changes in attributes of the body element
    const observer = new MutationObserver(checkModalOpen);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: attributeFilterToObserve[type],
    });

    // Clean up by removing the event listener and disconnecting the observer
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
