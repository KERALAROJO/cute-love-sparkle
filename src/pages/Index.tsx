import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================
   💖 VALENTINE PROPOSAL PAGE 💖
   
   ✏️ CUSTOMIZE THESE VALUES:
   ============================================ */
const GIRL_NAME = "My Love";
const ROMANTIC_MESSAGE = `Every moment with you feels like a dream I never want to wake up from. 
You are my sunshine, my moonlight, and everything in between. 
So here I am, asking you the most important question...`;
const SONG_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Replace with your romantic song URL
const YOUR_NAME = "Your Name";
/* ============================================ */

/* --- Floating Hearts Background --- */
const FloatingHearts = ({ count = 20 }: { count?: number }) => {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 8 + Math.random() * 8;
    const size = 14 + Math.random() * 20;
    const emoji = ["💖", "💕", "❤️", "💗", "💘", "🩷"][Math.floor(Math.random() * 6)];
    return (
      <span
        key={i}
        className="floating-heart"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          fontSize: `${size}px`,
        }}
      >
        {emoji}
      </span>
    );
  });
  return <>{hearts}</>;
};

/* --- Sparkle Particles (shown after YES) --- */
const Sparkles = () => {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    size: 8 + Math.random() * 16,
  }));
  return (
    <>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-particle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            fontSize: `${s.size}px`,
          }}
        >
          ✨
        </span>
      ))}
    </>
  );
};

/* --- Heart Beat Animation (CSS-in-component) --- */
const HeartAnimation = () => (
  <div className="text-6xl sm:text-8xl animate-wiggle select-none my-6">
    💝
  </div>
);

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<{ top?: string; left?: string }>({});
  const [noMoved, setNoMoved] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* --- Play romantic song on YES --- */
  const playMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(SONG_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    audioRef.current.play().catch(() => {});
  }, []);

  /* --- YES button handler --- */
  const handleYes = () => {
    setAccepted(true);
    playMusic();
  };

  /* --- NO button: runs away! --- */
  const handleNoHover = () => {
    const top = Math.random() * 80 + 5;
    const left = Math.random() * 75 + 5;
    setNoPosition({ top: `${top}%`, left: `${left}%` });
    setNoMoved(true);
  };

  /* --- Celebration hearts burst --- */
  const CelebrationHearts = () => {
    const burst = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: ["💖", "💕", "❤️", "💗", "💘", "🩷", "💞", "💓"][Math.floor(Math.random() * 8)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 6,
      size: 16 + Math.random() * 28,
    }));
    return (
      <>
        {burst.map((h) => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </>
    );
  };

  /* ============================================
     💖 MAIN RENDER
     ============================================ */

  // --- Accepted State: Celebration! ---
  if (accepted) {
    return (
      <div className="magical-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        <Sparkles />
        <CelebrationHearts />

        {/* Celebration popup */}
        <div className="relative z-10 bg-popover/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl animate-bounce-in">
          <div className="text-6xl sm:text-7xl mb-4">🎉💕</div>
          <h1 className="font-display text-3xl sm:text-5xl text-primary font-bold mb-4">
            Yayyyy!
          </h1>
          <p className="font-display text-xl sm:text-2xl text-foreground mb-2">
            You just made me the happiest person alive! 💕
          </p>
          <p className="text-muted-foreground font-body text-base sm:text-lg mt-4">
            I love you, {GIRL_NAME} 💖
          </p>
          <div className="text-5xl mt-6 animate-wiggle">💑</div>
        </div>

        {/* Footer */}
        <p className="absolute bottom-6 text-primary-foreground/80 font-body text-sm z-10">
          Made with ❤️ by {YOUR_NAME}
        </p>
      </div>
    );
  }

  // --- Proposal State ---
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background px-4">
      {/* Background floating hearts */}
      <FloatingHearts count={25} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-primary font-bold mb-2 leading-tight">
          Will You Be My Valentine? 💖
        </h1>

        {/* Heart animation */}
        <HeartAnimation />

        {/* Romantic message */}
        <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-4 whitespace-pre-line">
          Dear <span className="text-primary font-semibold">{GIRL_NAME}</span>,
        </p>
        <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-10 whitespace-pre-line">
          {ROMANTIC_MESSAGE}
        </p>

        {/* Buttons */}
        <div className="flex gap-6 items-center relative w-full justify-center min-h-[80px]">
          {/* YES Button */}
          <button
            onClick={handleYes}
            className="glow-button bg-primary text-primary-foreground font-display text-xl sm:text-2xl px-8 sm:px-10 py-4 rounded-full 
                       hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg cursor-pointer z-10"
          >
            YES 💘
          </button>

          {/* NO Button - runs away on hover/touch */}
          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoHover}
            className="bg-secondary text-secondary-foreground font-display text-xl sm:text-2xl px-8 sm:px-10 py-4 rounded-full 
                       hover:bg-muted transition-all duration-200 shadow-md cursor-pointer z-10"
            style={
              noMoved
                ? {
                    position: "fixed",
                    top: noPosition.top,
                    left: noPosition.left,
                    transition: "all 0.3s ease",
                  }
                : {}
            }
          >
            NO 💔
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-muted-foreground font-body text-sm z-10">
        Made with ❤️ by {YOUR_NAME}
      </p>
    </div>
  );
};

export default Index;
