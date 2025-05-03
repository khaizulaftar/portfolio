import { motion, useTransform, useMotionValue, useScroll, useAnimation } from "framer-motion";
import file from './file.json';
import { useEffect } from "react";

function Component() {
    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const controls = useAnimation();

    // Scroll tracking
    const { scrollY } = useScroll();

    // Image transformations
    const imgX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
    const imgY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);
    const rotateX = useTransform(mouseY, [0, window.innerHeight], [50, -50]);
    const rotateY = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);

    // Mouse effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            controls.start({
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, controls]);

    return (
        <>
            {/* Background Elements */}
            <div className="fixed top-0 left-0 right-0 bottom-0 blur-3xl" style={{ zIndex: -80 }}>
                <style>
                    {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-15px); }
                    }
                `}
                </style>
                <div className="flex items-center w-auto h-screen mx-auto justify-center blur-3xl">
                    {[
                        { color: "#366585", size: 350, pos: "ml-[-30%] top-[30%]" },
                        { color: "#2A3F4D", size: 330, pos: "mr-[10%] top-[0%]" },
                        { color: "#112F38", size: 370, pos: "ml-[20%] top-[10%]" },
                        { color: "#000000", size: 300, pos: "ml-[1%] top-[20%]" },
                        { color: "#4D3685", size: 320, pos: "ml-[10%] top-[40%]" },
                        { color: "#366585", size: 300, pos: "ml-[20%] top-[0%]" }
                    ].map((triangle, i) => (
                        <motion.div
                            key={i}
                            className={`absolute ${triangle.pos}`}
                            style={{
                                backgroundColor: triangle.color,
                                width: `${triangle.size}px`,
                                height: `${triangle.size}px`,
                                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                            }}
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                            }}
                            transition={{
                                duration: 8 + i,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Noise Texture */}
            <div className="h-screen fixed top-0 left-0 right-0 bottom-0 bg-[#101112]" style={{ zIndex: -100 }}>
                <svg id="noise" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="0.4" />
                            <feFuncG type="linear" slope="0.4" />
                            <feFuncB type="linear" slope="0.4" />
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise-filter)" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="h-[250vh]">
                <div className="sticky top-0 flex items-center justify-center overflow-hidden">
                    {/* Background Text */}
                    <div className="h-screen absolute flex flex-col items-center text-center justify-center blur-md">
                        <motion.h1
                            className="text-7xl md:text-9xl font-semibold uppercase text-white/50"
                            style={{
                                x: useTransform(scrollY, [0, 1000], [0, 300]),
                                opacity: useTransform(scrollY, [0, 1000], [1, 0]),
                            }}
                        >
                            khaizul
                        </motion.h1>
                        <motion.h1
                            className="text-7xl md:text-9xl font-semibold uppercase text-white/50"
                            style={{
                                x: useTransform(scrollY, [0, 1000], [0, -300]),
                                opacity: useTransform(scrollY, [0, 1000], [1, 0])
                            }}
                        >
                            aftar
                        </motion.h1>
                    </div>

                    {/* Profile Section */}
                    <div className="z-10 h-screen flex flex-col items-center justify-center gap-5">
                        <motion.div animate={controls}>
                            <motion.img
                                src="/assets/profile.png"
                                className="w-40 rounded-full border-2 border-white/20 shadow-lg"
                                style={{ x: imgX, y: imgY, rotateX, rotateY, perspective: 1000 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        </motion.div>
                        <div className="text-center">
                            <h1 className="text-xl sm:text-3xl font-semibold text-white">Web & Android Developer</h1>
                            <h1 className="text-xl sm:text-3xl font-semibold text-white">Personal Secretary at Polresta Padang</h1>
                        </div>

                        <div className="text-center max-w-2xl mx-6">
                            <p className="text-white">Building efficient web and Android application solutions, supported by strong organizational, communication, and documentation skills from experience as a personal secretary</p>
                        </div>

                        <motion.a
                            href="/assets/CV Khaizul Aftar.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border px-5 py-3 rounded-full capitalize text-white border-white/30 hover:border-white/60 inline-block text-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            show my cv
                        </motion.a>
                    </div>
                </div>
            </div>

            <div className="mb-80 mt-20 overflow-hidden">
                <div className="flex flex-col items-center gap-10 sticky top-20">
                    <motion.div
                        className="overflow-x-scroll max-w-5xl"
                        style={{ scrollbarWidth: 'none' }}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, margin: "0px 0px -50% 0px" }}
                    >
                        <motion.div
                            className="flex space-x-20 p-2"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...file.skill, ...file.skill].map((value, index) => (
                                <motion.img
                                    key={index}
                                    src={value.icons}
                                    className="h-16"
                                    alt={value.language}
                                    whileHover={{ scale: 1.25, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="max-w-3xl text-center sticky"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-2xl text-white mx-6 leading-relaxed tracking-wide">
                            A graduate of Muathafawiyah Islamic boarding school with expertise in full-stack web development. Continuously learning in the IT field and also experienced as a Personal Assistant at Polresta Padang. Open to opportunities in technology and professional development
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Skills Grid Section */}
            <div className="md:grid md:grid-cols-2 gap-0 align-center my-40">
                <div className="text-center md:text-end sticky top-20 md:top-0 md:relative">
                    <motion.div
                        className="sticky md:top-40 mb-10 mx-6"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 }}
                        viewport={{ once: true, margin: "0px 0px -50% 0px" }}
                    >
                        <p className="text-xl text-gray-500 font-semibold">
                            programming language & framework
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white capitalize">
                            my skills
                        </h1>
                    </motion.div>
                </div>

                <div className="mx-6">
                    {file.skill.map((value, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#272829] max-w-lg rounded-xl flex flex-col sm:flex-row gap-5 p-6 mb-10 sticky top-60 md:top-40 mx-auto shadow transition-all"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 18,
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                            whileHover={{ scale: 1.05, rotate: -1 }}
                        >
                            <div>
                                <img
                                    src={value.icons}
                                    className="w-12 h-12 object-contain"
                                    alt={value.language}
                                />
                            </div>
                            <div className="w-full">
                                <h1 className="text-2xl md:text-3xl font-semibold capitalize text-white">
                                    {value.language}
                                </h1>
                                <p className="my-3 text-white text-sm">{value.description}</p>
                                <div className="block rounded-full bg-gray-400 w-full overflow-hidden">
                                    <motion.span
                                        className="block h-3 flex items-center justify-center rounded-full bg-[#82FF1F] text-center text-[10px]"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: value.persen }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 90,
                                            damping: 12,
                                            delay: 0.4 + index * 0.1,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <span className="font-bold text-gray-700">{value.persen}</span>
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* Experience Section */}
            <motion.div
                className="mx-6 sm:px-24"
                initial={{ opacity: 0, y: 80, rotateX: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            >
                <h1 className="text-xl uppercase mb-6 text-white font-semibold tracking-widest">
                    experience
                </h1>

                <motion.div
                    className="rounded-xl flex flex-col lg:flex-row gap-5 sm:p-12 p-6 mb-6 transition-all backdrop-blur-md border border-gray-600/30"
                    style={{ backgroundColor: "rgba(39, 40, 41, 0.4)" }}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        initial={{ rotateZ: -10, opacity: 0 }}
                        whileInView={{ rotateZ: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img src="/assets/logo.png" className="w-20" alt="Experience" />
                    </motion.div>

                    <div>
                        <motion.h1
                            className="text-2xl sm:text-3xl font-semibold capitalize text-white"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Personal Secretary
                        </motion.h1>

                        <motion.h2
                            className="my-2 text-lg capitalize text-white"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            polresta padang | Padang Sumatera Barat
                        </motion.h2>

                        <motion.span
                            className="rounded-full px-3 py-1 bg-white text-gray-700 inline-block text-sm"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 180, damping: 10, delay: 0.5 }}
                        >
                            Maret 2023 - Maret 2025
                        </motion.span>

                        <ul className="mt-2 list-disc text-gray-400 ml-5 text-sm">
                            {[
                                "Managed admin tasks, including scheduling and filing.",
                                "Drafted and handled official correspondence.",
                                "Prepared reports, memos, and key documents.",
                            ].map((text, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {text}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    className="rounded-xl flex flex-col lg:flex-row gap-5 sm:p-12 p-6 mb-6 transition-all backdrop-blur-md border border-gray-600/30"
                    style={{ backgroundColor: "rgba(39, 40, 41, 0.4)" }}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        initial={{ rotateZ: -10, opacity: 0 }}
                        whileInView={{ rotateZ: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img src="/assets/siko kebab.png" className="w-20" alt="Experience" />
                    </motion.div>

                    <div>
                        <motion.h1
                            className="text-2xl sm:text-3xl font-semibold capitalize text-white"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Freelance Web Devaloper
                        </motion.h1>

                        <motion.h2
                            className="my-2 text-lg capitalize text-white"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Siko Kebab | padang, sumatera barat
                        </motion.h2>

                        <motion.span
                            className="rounded-full px-3 py-1 bg-white text-gray-700 inline-block text-sm"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 180, damping: 10, delay: 0.5 }}
                        >
                            Januari - Februari 2025
                        </motion.span>

                        <ul className="mt-2 list-disc text-gray-400 ml-5 text-sm">
                            {[
                                "Developed a web-based system for inventory management and income tracking.",
                                "Building a fullstack web application using Next.js, Tailwind CSS, and MySQL.",
                                "Performed app testing and version control using Git & GitHub.",
                            ].map((text, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {text}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </motion.div>


            {/* Certificates Section */}
            <div className="h-screen flex items-center justify-center relative overflow-hidden">
                {/* Content */}
                <div className="text-center items-center flex flex-col gap-5 relative z-20 mb-12 mx-6">
                    <motion.h1
                        className="capitalize text-3xl sm:text-5xl text-white font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        my licences & certifications
                    </motion.h1>

                    <motion.p
                        className="max-w-md text-white/80"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        "I hold a coding certificate that showcases my skills in web development and programming."
                    </motion.p>
                </div>

                {/* Certificates Marquee - Now Clearly Visible */}
                <div className="absolute w-full flex flex-col">
                    {/* Top Row */}
                    <motion.div
                        className="overflow-hidden w-full"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            className="flex gap-8 w-max py-10"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{
                                duration: 500,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {[...file.certificate, ...file.certificate].map((cert, i) => (
                                <motion.div
                                    key={`top-${i}`}
                                    className="relative group w-64 h-48 flex-shrink-0"
                                >
                                    <motion.img
                                        src={cert}
                                        className="w-full h-full object-contain"
                                        initial={{ filter: "blur(4px)", opacity: 0.7 }}
                                        whileHover={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            scale: 1.5,
                                            transition: { duration: 0.3 }
                                        }}
                                        alt="Certificate"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Bottom Row - Fixed Animation */}
                    <motion.div
                        className="overflow-hidden w-full py-10"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: { duration: 1, delay: 0.3 }
                        }}
                    >
                        <motion.div
                            className="flex gap-8 w-max"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{
                                duration: 500,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 0 // Removed the 50 second delay
                            }}
                        >
                            {[...file.certificate, ...file.certificate].map((cert, i) => (
                                <motion.div
                                    key={`bottom-${i}`}
                                    className="relative group w-64 h-48 flex-shrink-0"
                                >
                                    <motion.img
                                        src={cert}
                                        className="w-full h-full object-contain"
                                        initial={{ filter: "blur(4px)", opacity: 0.7 }}
                                        whileHover={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            scale: 1.5,
                                            transition: { duration: 0.3 }
                                        }}
                                        alt="Certificate"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Component;