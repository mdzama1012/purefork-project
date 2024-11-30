import { useEffect, useState } from 'react';

import useInternetStatus from '../hooks/useInternetStatus';

const ConnectionStatus = () => {
  const isOnline = useInternetStatus();
  const [renderCount, setRenderCount] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    // Restart animation when status changes.
    setAnimationKey((prevKey) => prevKey + 1);
  }, [isOnline]);

  // Only show the status bar only when the internet status changes.
  if (renderCount <= 1) return null;

  return (
    <div
      key={animationKey} // Force DOM re-render to restart animation
      className={`fixed bottom-0 w-full animate-informer border-slate-500 py-0.5 text-center text-sm font-semibold uppercase text-white shadow-xl ${isOnline ? 'bg-green-600' : 'bg-red-600'}`}
    >
      {isOnline ? 'Back Online' : 'Offline'}
    </div>
  );
};

export default ConnectionStatus;
