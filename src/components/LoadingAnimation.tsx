import React, { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps1 = 15000;
    const steps2 = 1200;
    const steps3 = 50000;
    const interval = 20;

    const increment1 = Math.ceil(steps1 / (duration / interval));
    const increment2 = Math.ceil(steps2 / (duration / interval));
    const increment3 = Math.ceil(steps3 / (duration / interval));

    const timer = setInterval(() => {
      setCount1(prev => {
        const next = prev + increment1;
        return next >= steps1 ? steps1 : next;
      });
      setCount2(prev => {
        const next = prev + increment2;
        return next >= steps2 ? steps2 : next;
      });
      setCount3(prev => {
        const next = prev + increment3;
        return next >= steps3 ? steps3 : next;
      });
    }, interval);

    const completeTimer = setTimeout(() => {
      clearInterval(timer);
      onComplete();
    }, duration + 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E3264] mb-16">
          Finding the <span className="relative">
            best
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-coral-500"></span>
          </span> job opportunities in Europe for you... 🌍
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          <div>
            <div className="text-5xl font-bold text-[#1E3264] mb-3">
              {count1.toLocaleString()}+
            </div>
            <p className="text-gray-600 text-lg">
              Active and verified job openings in manufacturing, logistics, and more
            </p>
          </div>
          <div>
            <div className="text-5xl font-bold text-[#1E3264] mb-3">
              {count2.toLocaleString()}+
            </div>
            <p className="text-gray-600 text-lg">
              Trusted employers waiting for your application
            </p>
          </div>
          <div>
            <div className="text-5xl font-bold text-[#1E3264] mb-3">
              {count3.toLocaleString()}+
            </div>
            <p className="text-gray-600 text-lg">
              People we've helped start their new careers abroad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}