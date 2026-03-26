import { useState, useEffect } from "react";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-[64px] left-0 right-0 h-[3px] z-50 bg-transparent">
      <div className="h-full bg-accent transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgressBar;
