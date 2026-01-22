import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, z: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    z: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroTag() {
  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div 
        className="inline-block" 
        variants={itemVariants}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="group relative px-3 py-1.5
                 bg-linear-to-r from-[#6F8F7A]/5 to-[#C6A15B]/5
                 backdrop-blur-sm border border-[#6F8F7A]/20
                 rounded-full overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateY: 0, z: 0 }}
          whileHover={{
            rotateY: 5,
            rotateX: -3,
            z: 40,
            scale: 1.05,
            borderColor: "rgba(198, 161, 91, 0.35)",
            boxShadow: "0 20px 40px rgba(198, 161, 91, 0.2), 0 0 20px rgba(111, 143, 122, 0.15)",
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-[#6F8F7A]/10 to-[#C6A15B]/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          <p
            className="relative text-[#C6A15B] text-xs font-light
                    tracking-[0.15em] flex items-center gap-1.5
                    justify-center lg:justify-start"
          >
            <motion.span
              style={{ transformStyle: "preserve-3d" }}
              animate={{ 
                rotate: [0, 12, -12, 12, 0],
                z: [0, 10, 0, 10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              whileHover={{
                rotate: 360,
                scale: 1.2,
                z: 20,
                transition: { duration: 0.6 }
              }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            AVAILABLE FOR WORK
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}