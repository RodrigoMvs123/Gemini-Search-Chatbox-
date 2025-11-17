
import React, { useEffect } from 'react';

const useAutoResizeTextarea = (
  // FIX: React.RefObject type requires the 'React' namespace, which is now imported.
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  value: string
) => {
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textareaRef, value]);
};

export default useAutoResizeTextarea;
