// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const voices = [
//   {
//     name: "Zoya T.",
//     avatar: "https://i.pravatar.cc/100?img=33",
//     quote:
//       "Before this platform, I had never published anything. Now my article reached 500+ readers!",
//   },
//   {
//     name: "Kunal V.",
//     avatar: "https://i.pravatar.cc/100?img=45",
//     quote: "This community helped me rebuild confidence after failing two internships.",
//   },
//   {
//     name: "Mina A.",
//     avatar: "https://i.pravatar.cc/100?img=15",
//     quote: "Sharing my code here got me my first freelance client. Forever grateful!",
//   },
//   {
//     name: "Dev R.",
//     avatar: "https://i.pravatar.cc/100?img=9",
//     quote:
//       "Not just a platform — it's a place where people lift each other up with ideas.",
//   },
// ];

// const ExtraSections2 = () => {
//   const [index, setIndex] = useState(0);
//   const radius = 120;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % voices.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="extra2 w-full max-w-4xl mx-auto px-4 py-16 mb-5">
//       <h2 className="extra2 text-3xl font-bold text-zinc-900  text-center mb-12">
//         💬 Voices of Impact
//       </h2>

//       <div className="relative h-[400px] flex items-center justify-center overflow-hidden   rounded-3xl shadow-xl">
//         {voices.map((voice, i) => {
//           const angle = ((360 / voices.length) * ((i - index + voices.length) % voices.length)) * (Math.PI / 180);
//           const x = Math.cos(angle) * radius;
//           const y = Math.sin(angle) * radius;

//           const isActive = i === index;

//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{
//                 x,
//                 y,
//                 opacity: isActive ? 1 : 0.5,
//                 scale: isActive ? 1.2 : 0.8,
//                 zIndex: isActive ? 10 : 1,
//               }}
//               transition={{ duration: 0.8, type: "spring" }}
//               className={`absolute w-64 text-center p-4 rounded-xl border ${
//                 isActive
//                   ? "bg-white  shadow-lg border-blue-400"
//                   : "bg-zinc-100  border-transparent"
//               }`}
//             >
//               <img
//                 src={voice.avatar}
//                 alt={voice.name}
//                 className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-blue-500"
//               />
//               <h3 className="text-md font-semibold text-zinc-800 ">
//                 {voice.name}
//               </h3>
//               <p className="text-sm text-zinc-600  mt-2 italic">
//                 “{voice.quote}”
//               </p>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ExtraSections2;
