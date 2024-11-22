import { useEffect, useState } from "react";

const useInternetStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    // It’s best practice to remove the event listeners in the useEffect cleanup function to prevent memory leaks.
    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return isOnline;
};

export default useInternetStatus;
