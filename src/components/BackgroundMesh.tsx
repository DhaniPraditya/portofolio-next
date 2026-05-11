"use client";

import { motion } from "framer-motion";

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Crimson Red Blob */}
      <motion.div 
        animate={{ x: [0, 50, -30, 0], y: [0, -60, 30, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle, rgba(215, 38, 61, 0.15) 0%, rgba(215, 38, 61, 0) 70%)'
        }}
        className="absolute top-[-10%] left-[-10%] w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] rounded-full will-change-transform" 
      />
      
      {/* Navy/Blue Blob */}
      <motion.div 
        animate={{ x: [0, -40, 30, 0], y: [0, 50, -40, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0) 70%)'
        }}
        className="absolute top-[30%] right-[-10%] w-[35rem] md:w-[50rem] h-[35rem] md:h-[50rem] rounded-full will-change-transform" 
      />
      
      {/* Rose Blob */}
      <motion.div 
        animate={{ x: [0, 60, -50, 0], y: [0, 30, -50, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, rgba(244, 63, 94, 0) 70%)'
        }}
        className="absolute bottom-[-10%] left-[20%] w-[45rem] md:w-[60rem] h-[45rem] md:h-[60rem] rounded-full will-change-transform" 
      />
    </div>
  );
}
