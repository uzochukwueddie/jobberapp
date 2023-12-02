import { RefObject, useEffect, useRef } from 'react';

const useChatScrollToBottom = (prop: unknown[]): RefObject<HTMLDivElement> => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    }
  }, [prop]);

  return scrollRef;
};

export default useChatScrollToBottom;
