import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================
   💖 VALENTINE PROPOSAL - CUSTOMIZE HERE 💖
   ============================================ */

// ✏️ Girl's name
const GIRL_NAME = "My Love";

// ✏️ Love confession lines (typewriter effect)
const LOVE_CONFESSION_LINES = [
  "From the moment I met you...",
  "You made my world brighter...",
  "Every smile of yours feels like home...",
  "So today I just want to ask you something special...",
];

// ✏️ Romantic popup messages after YES
const POPUP_TITLE = "Yayyyy!";
const POPUP_MESSAGE = "You just made me the happiest person alive! 💕";
const POPUP_PROMISE = "I promise to cherish you forever.";

// ✏️ Song URL (plays during typewriter & after YES)
const SONG_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// ✏️ Your name (footer credit)
const YOUR_NAME = "Your Name";

/* ============================================ */

// ---- Floating Hearts Background ----
const FloatingHearts = ({ count = 20 }: { count?: number }) => {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 8 + Math.random() * 8;
    const size = 14 + Math.random() * 20;
    const emoji = ["💖", "💕", "❤️", "💗", "💘", "🩷"][i % 6];
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

// ---- Sparkle Particles ----
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

/* =============================================
   ENVELOPE COMPONENT
   ============================================= */
const Envelope = ({ onOpen }: { onOpen: () => void }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background px-4 cursor-pointer"
      onClick={onOpen}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <FloatingHearts count={15} />

      {/* Title above envelope */}
      <p
        className="relative z-10 font-display text-2xl sm:text-4xl text-primary mb-8 text-center"
        style={{ animation: "fade-up 1s ease-out forwards" }}
      >
        You have a love letter 💌
      </p>

      {/* Envelope body */}
      <div
        className="relative z-10 w-64 h-44 sm:w-80 sm:h-52 rounded-xl shadow-2xl flex items-end justify-center overflow-visible"
        style={{
          backgroundColor: "hsl(340 60% 90%)",
          animation: "envelope-bounce 2s ease-in-out infinite",
          transition: "transform 0.3s",
          transform: hovering ? "scale(1.05)" : "scale(1)",
        }}
      >
        {/* Envelope flap (triangle) */}
        <div
          className="absolute -top-0 left-0 w-full"
          style={{
            height: "0",
            borderLeft: "calc(var(--env-w, 160px)) solid transparent",
            borderRight: "calc(var(--env-w, 160px)) solid transparent",
            borderTop: "70px solid hsl(340 70% 82%)",
            transformOrigin: "top center",
          }}
        />

        {/* Heart seal */}
        <div className="absolute -top-3 z-20 text-3xl animate-wiggle select-none">
          💝
        </div>

        {/* Inner "letter" peek */}
        <div
          className="paper-texture w-[90%] h-[70%] rounded-t-lg mx-auto mb-0 flex items-center justify-center"
          style={{ boxShadow: "0 -4px 15px rgba(0,0,0,0.05)" }}
        >
          <p className="font-display text-primary/60 text-sm sm:text-base text-center px-4">
            Click to open...
          </p>
        </div>
      </div>

      {/* Tap hint on mobile */}
      <p className="relative z-10 text-muted-foreground text-sm mt-6 animate-pulse">
        Tap the envelope 💌
      </p>

      {/* Footer */}
      <p className="absolute bottom-6 text-muted-foreground font-body text-sm z-10">
        Made with ❤️ by {YOUR_NAME}
      </p>
    </div>
  );
};

/* =============================================
   TYPEWRITER COMPONENT
   ============================================= */
const Typewriter = ({ lines, onComplete }: { lines: string[]; onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      const timer = setTimeout(onComplete, 1200);
      return () => clearTimeout(timer);
    }

    const line = lines[currentLine];
    if (currentChar <= line.length) {
      const timer = setTimeout(() => {
        setActiveLine(line.slice(0, currentChar));
        setCurrentChar((c) => c + 1);
      }, 45);
      return () => clearTimeout(timer);
    } else {
      // Line complete, pause then move to next
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[currentLine]]);
        setActiveLine("");
        setCurrentChar(0);
        setCurrentLine((l) => l + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines, onComplete]);

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto text-center space-y-3 px-4">
      {/* Already typed lines */}
      {displayedLines.map((line, i) => (
        <p
          key={i}
          className="font-display text-lg sm:text-2xl text-foreground/80 leading-relaxed"
          style={{ animation: "fade-up 0.5s ease-out forwards" }}
        >
          {line}
        </p>
      ))}
      {/* Currently typing line */}
      {!done && (
        <p className="font-display text-lg sm:text-2xl text-primary leading-relaxed">
          <span>{activeLine}</span>
          <span className="typewriter-cursor" />
        </p>
      )}
    </div>
  );
};

/* =============================================
   MAIN PAGE COMPONENT
   ============================================= */
const Index = () => {
  // Phase: "envelope" → "typewriter" → "proposal" → "accepted"
  const [phase, setPhase] = useState<"envelope" | "typewriter" | "proposal" | "accepted">("envelope");
  const [noPosition, setNoPosition] = useState<{ top?: string; left?: string }>({});
  const [noMoved, setNoMoved] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ---- Audio helper ----
  const playMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(SONG_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    audioRef.current.play().catch(() => {});
  }, []);

  // ---- Envelope opened → start typewriter + music ----
  const handleEnvelopeOpen = () => {
    setPhase("typewriter");
  };

  // ---- Typewriter done → show proposal ----
  const handleTypewriterDone = useCallback(() => {
    setPhase("proposal");
    setTimeout(() => setButtonsVisible(true), 400);
  }, []);

  // ---- YES clicked ----
  const handleYes = () => {
    setPhase("accepted");
  };

  // ---- NO button runs away ----
  const handleNoHover = () => {
    const top = Math.random() * 80 + 5;
    const left = Math.random() * 75 + 5;
    setNoPosition({ top: `${top}%`, left: `${left}%` });
    setNoMoved(true);
  };

  /* ---- PHASE: ENVELOPE ---- */
  if (phase === "envelope") {
    return <Envelope onOpen={handleEnvelopeOpen} />;
  }

  /* ---- PHASE: TYPEWRITER (letter content) ---- */
  if (phase === "typewriter") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background px-4">
        <FloatingHearts count={20} />

        {/* Letter card */}
        <div
          className="relative z-10 paper-texture rounded-2xl shadow-2xl p-8 sm:p-12 max-w-lg w-full"
          style={{ animation: "fade-up 0.8s ease-out forwards" }}
        >
          {/* Decorative top */}
          <div className="text-center mb-6">
            <span className="text-4xl">💌</span>
            <p className="font-display text-xl sm:text-2xl text-primary mt-2">
              Dear {GIRL_NAME},
            </p>
          </div>

          <Typewriter lines={LOVE_CONFESSION_LINES} onComplete={handleTypewriterDone} />
        </div>

        <p className="absolute bottom-6 text-muted-foreground font-body text-sm z-10">
          Made with ❤️ by {YOUR_NAME}
        </p>
      </div>
    );
  }

  /* ---- PHASE: ACCEPTED (celebration) ---- */
  if (phase === "accepted") {
    return (
      <div className="magical-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        <Sparkles />
        <FloatingHearts count={40} />

        {/* Celebration card */}
        <div
          className="relative z-10 bg-popover/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl glow-ring"
          style={{ animation: "bounce-in 0.6s ease-out forwards" }}
        >
          <div className="text-6xl sm:text-7xl mb-4">🎉💕</div>
          <h1 className="font-display text-3xl sm:text-5xl text-primary font-bold mb-4">
            {POPUP_TITLE}
          </h1>
          <p className="font-display text-xl sm:text-2xl text-foreground mb-2">
            {POPUP_MESSAGE}
          </p>
          <p className="font-body text-base sm:text-lg text-muted-foreground mt-2 italic">
            {POPUP_PROMISE}
          </p>
          <p className="text-muted-foreground font-body text-base mt-4">
            I love you, {GIRL_NAME} 💖
          </p>
          <div className="text-5xl mt-6 animate-wiggle">💑</div>
        </div>

        <p className="absolute bottom-6 text-primary-foreground/80 font-body text-sm z-10">
          Made with ❤️ by {YOUR_NAME}
        </p>
      </div>
    );
  }

  /* ---- PHASE: PROPOSAL (question + buttons) ---- */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background px-4">
      <FloatingHearts count={25} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        {/* Big heading */}
        <h1
          className="font-display text-4xl sm:text-6xl md:text-7xl text-primary font-bold mb-4 leading-tight"
          style={{ animation: "fade-up 0.6s ease-out forwards" }}
        >
          Will You Be My Valentine? 💖
        </h1>

        {/* Heart */}
        <div className="text-6xl sm:text-8xl animate-wiggle select-none my-4">💝</div>

        {/* Subtitle */}
        <p
          className="font-body text-base sm:text-lg text-muted-foreground mb-10"
          style={{ animation: "fade-up 0.8s ease-out 0.2s both" }}
        >
          Dear <span className="text-primary font-semibold">{GIRL_NAME}</span>, you already know what's in my heart...
        </p>

        {/* Buttons with fade-in */}
        <div
          className="flex gap-6 items-center relative w-full justify-center min-h-[80px]"
          style={{
            opacity: buttonsVisible ? 1 : 0,
            transform: buttonsVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          {/* YES */}
          <button
            onClick={handleYes}
            className="glow-button bg-primary text-primary-foreground font-display text-xl sm:text-2xl px-8 sm:px-10 py-4 rounded-full 
                       hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg cursor-pointer z-10"
          >
            YES 💘
          </button>

          {/* NO - runs away */}
          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoHover}
            className="bg-secondary text-secondary-foreground font-display text-xl sm:text-2xl px-8 sm:px-10 py-4 rounded-full 
                       hover:bg-muted transition-all duration-200 shadow-md cursor-pointer z-10"
            style={
              noMoved
                ? { position: "fixed", top: noPosition.top, left: noPosition.left, transition: "all 0.3s ease" }
                : {}
            }
          >
            NO 💔
          </button>
        </div>
      </div>

      <p className="absolute bottom-6 text-muted-foreground font-body text-sm z-10">
        Made with ❤️ by {YOUR_NAME}
      </p>
    </div>
  );
};

export default Index;
