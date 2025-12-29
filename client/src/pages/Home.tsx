import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, Mouse } from "lucide-react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden relative selection:bg-red-500 selection:text-white">
      {/* Custom Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-40 mix-blend-difference">
        <div className="flex flex-col gap-1">
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
        </div>
        <div className="hidden md:flex gap-12 font-mono text-sm tracking-widest uppercase">
          {["Home", "Gallery", "Contact"].map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-red-500 transition-colors duration-300 relative group">
              <span className="text-xs text-gray-500 mr-2">0{i + 1}</span>
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </nav>

      {/* Sidebar Text */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-8 z-30 mix-blend-difference">
        <div className="vertical-text font-display font-bold text-xl tracking-widest uppercase text-white/80 rotate-180">
          Ahmad Waqar
        </div>
        <div className="w-0.5 h-24 bg-white/20"></div>
        <div className="vertical-text font-mono text-xs tracking-widest text-white/40 rotate-180">
          01/03
        </div>
      </div>

      {/* Main Content */}
      <main className="relative w-full min-h-screen flex flex-col md:flex-row">
        
        {/* Left Section - Text */}
        <div className="w-full md:w-1/2 h-screen flex flex-col justify-center px-8 md:px-32 relative z-20">
          {/* Giant Background Number */}
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 font-display font-bold text-[20rem] md:text-[30rem] leading-none text-white/5 select-none -z-10 pointer-events-none"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            01
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <h1 className="font-mono text-2xl md:text-4xl leading-relaxed md:leading-relaxed text-white/90 max-w-2xl">
              I'm Ahmad, I code, mostly<span className="text-white font-bold border-b-2 border-red-500">automation</span> but sometimes other things.
            </h1>
            
            <div className="mt-12 flex gap-12 font-mono text-sm">
              <div className="flex flex-col gap-2 group cursor-pointer">
                <span className="text-red-500 font-bold">01</span>
                <span className="uppercase tracking-widest group-hover:text-red-500 transition-colors">Home</span>
              </div>
              <div className="flex flex-col gap-2 group cursor-pointer">
                <span className="text-gray-600 font-bold group-hover:text-white transition-colors">02</span>
                <span className="uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Gallery</span>
              </div>
              <div className="flex flex-col gap-2 group cursor-pointer">
                <span className="text-gray-600 font-bold group-hover:text-white transition-colors">03</span>
                <span className="uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Contact</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 h-screen relative overflow-hidden bg-black">
          <motion.div 
            className="absolute inset-0 z-10 bg-linear-to-r from-background via-transparent to-transparent w-1/2"
          ></motion.div>
          
          <motion.img
            src="/images/ahmad-dark.png"
            alt="Portrait"
            className="w-full h-full object-cover object-center opacity-90"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Overlay Texture/Noise (Optional) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 mix-blend-difference z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-12 bg-linear-to-b from-transparent via-white/50 to-transparent"></div>
          <Mouse size={20} />
        </motion.div>
      </main>
    </div>
  );
}
