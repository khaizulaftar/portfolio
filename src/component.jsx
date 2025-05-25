import { motion, useTransform, useScroll, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import file from './file.json';

function Component() {
    const controls = useAnimation();
    const { scrollYProgress } = useScroll();
    const containerRef = useRef(null);
    
    // Optimasi untuk background triangles
    const triangleVariants = {
        animate: (i) => ({
            y: [0, -15, 0],
            rotate: [0, i % 2 === 0 ? 5 : -5, 0],
            transition: {
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut"
            }
        })
    };

    return (
        <>
            {/* Background Elements - Dioptimasi */}
            <div className="fixed top-0 left-0 right-0 bottom-0" style={{ zIndex: -80 }}>
                <div className="absolute inset-0 blur-3xl overflow-hidden">
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
                                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                                willChange: 'transform'
                            }}
                            custom={i}
                            variants={triangleVariants}
                            initial="initial"
                            animate="animate"
                        />
                    ))}
                </div>
            </div>

            {/* Noise Texture - Dioptimasi */}
            <div className="fixed inset-0 bg-[#101112] pointer-events-none" style={{ zIndex: -100 }}>
                <svg className="w-full h-full opacity-30">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            {/* Main Content - Scroll Smooth */}
            <div className="relative z-10" ref={containerRef}>
                {/* Hero Section */}
                <section className="h-screen flex items-center justify-center relative overflow-hidden">
                    {/* Background Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center blur-md">
                        <motion.h1
                            className="text-7xl md:text-9xl font-semibold uppercase text-white/50"
                            style={{
                                x: useTransform(scrollYProgress, [0, 1], [0, 300]),
                                opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
                            }}
                        >
                            khaizul
                        </motion.h1>
                        <motion.h1
                            className="text-7xl md:text-9xl font-semibold uppercase text-white/50"
                            style={{
                                x: useTransform(scrollYProgress, [0, 1], [0, -300]),
                                opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
                            }}
                        >
                            aftar
                        </motion.h1>
                    </div>

                    {/* Profile Section */}
                    <motion.div 
                        className="flex flex-col items-center justify-center gap-5 p-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            animate={controls}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.img
                                src="/assets/profile.png"
                                className="w-40 rounded-full border-2 border-white/20 shadow-lg"
                                alt="Profile"
                            />
                        </motion.div>
                        
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h1 className="text-xl sm:text-3xl font-semibold text-white">Web & Android Developer</h1>
                            <h1 className="text-xl sm:text-3xl font-semibold text-white">Personal Secretary at Polresta Padang</h1>
                        </motion.div>

                        <motion.p 
                            className="max-w-2xl mx-6 text-white"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Building efficient web and Android application solutions, supported by strong organizational, communication, and documentation skills from experience as a personal secretary
                        </motion.p>

                        <motion.a
                            href="/assets/CV Khaizul Aftar.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border px-5 py-3 rounded-full capitalize text-white border-white/30 hover:border-white/60 inline-block text-center"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            show my cv
                        </motion.a>
                    </motion.div>
                </section>

                {/* Skills Marquee */}
                <section className="py-20">
                    <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    >
                        <motion.div
                            className="flex gap-8 py-10"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...file.skill, ...file.skill].map((value, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="flex-shrink-0 px-4"
                                >
                                    <img
                                        src={value.icons}
                                        className="h-16 w-auto object-contain"
                                        alt={value.language}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="max-w-3xl mx-auto text-center px-6"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-2xl text-white leading-relaxed tracking-wide">
                            A graduate of Muathafawiyah Islamic boarding school with expertise in full-stack web development. Continuously learning in the IT field and also experienced as a Personal Assistant at Polresta Padang. Open to opportunities in technology and professional development
                        </p>
                    </motion.div>
                </section>

                {/* Skills Grid Section */}
                <section className="py-20 md:grid md:grid-cols-2 gap-0">
                    <div className="text-center md:text-end sticky top-20 h-min">
                        <motion.div
                            className="md:sticky md:top-40 mb-10 mx-6"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
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
                        {file.skill.map((value, index) => {
                            const ref = useRef(null);
                            const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
                            
                            return (
                                <motion.div
                                    key={index}
                                    ref={ref}
                                    className="bg-[#272829] max-w-lg rounded-xl flex flex-col sm:flex-row gap-5 p-6 mb-10 mx-auto shadow-lg"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ type: "spring", damping: 15 }}
                                    whileHover={{ scale: 1.02 }}
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
                                        <div className="block rounded-full bg-gray-400 w-full overflow-hidden h-3">
                                            <motion.div
                                                className="h-full bg-[#82FF1F] rounded-full flex items-center justify-end pr-2"
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: value.persen } : {}}
                                                transition={{ duration: 1, type: "spring" }}
                                            >
                                                <span className="text-[10px] font-bold text-gray-700">{value.persen}</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="py-20 mx-6 sm:px-24">
                    <motion.h1
                        className="text-2xl uppercase mb-6 text-white font-semibold tracking-widest"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        experience
                    </motion.h1>

                    {[
                        {
                            logo: "/assets/logo.png",
                            title: "Personal Secretary",
                            company: "polresta padang | Padang Sumatera Barat",
                            period: "Maret 2023 - Maret 2025",
                            points: [
                                "Managed admin tasks, including scheduling and filing.",
                                "Drafted and handled official correspondence.",
                                "Prepared reports, memos, and key documents.",
                            ]
                        },
                        {
                            logo: "/assets/siko kebab.png",
                            title: "Freelance Web Developer",
                            company: "Siko Kebab | padang, sumatera barat",
                            period: "Januari - Februari 2025",
                            points: [
                                "Developed a web-based system for inventory management and income tracking.",
                                "Building a fullstack web application using Next.js, Tailwind CSS, and MySQL.",
                                "Performed app testing and version control using Git & GitHub.",
                            ]
                        }
                    ].map((exp, i) => (
                        <motion.div
                            key={i}
                            className="rounded-xl flex flex-col lg:flex-row gap-5 sm:p-12 p-6 mb-6 backdrop-blur-sm border border-gray-600/30 bg-[rgba(39,40,41,0.4)]"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <motion.div
                                initial={{ rotateZ: -10, opacity: 0 }}
                                whileInView={{ rotateZ: 0, opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <img src={exp.logo} className="w-20 h-20 object-contain" alt={exp.company} />
                            </motion.div>

                            <div>
                                <motion.h1
                                    className="text-2xl sm:text-3xl font-semibold capitalize text-white"
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {exp.title}
                                </motion.h1>

                                <motion.h2
                                    className="my-2 text-lg capitalize text-white"
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {exp.company}
                                </motion.h2>

                                <motion.span
                                    className="rounded-full px-3 py-1 bg-white text-gray-700 inline-block text-sm mb-4"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", delay: 0.4 }}
                                >
                                    {exp.period}
                                </motion.span>

                                <ul className="space-y-2">
                                    {exp.points.map((text, j) => (
                                        <motion.li
                                            key={j}
                                            className="text-gray-400 text-sm"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.5 + j * 0.1 }}
                                        >
                                            • {text}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Certificates Section */}
                <section className="h-screen flex items-center justify-center relative overflow-hidden py-20">
                    <div className="text-center items-center flex flex-col gap-5 relative z-20 mb-12 mx-6">
                        <motion.h1
                            className="capitalize text-3xl sm:text-5xl text-white font-semibold"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            my licences & certifications
                        </motion.h1>

                        <motion.p
                            className="max-w-md text-white/80"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            "I hold a coding certificate that showcases my skills in web development and programming."
                        </motion.p>
                    </div>

                    {/* Certificates Marquee */}
                    <div className="absolute w-full flex flex-col">
                        {[0, 1].map((row) => (
                            <motion.div
                                key={row}
                                className="overflow-hidden w-full py-10"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                            >
                                <motion.div
                                    className="flex gap-8 w-max"
                                    animate={{ x: row === 0 ? ["0%", "-100%"] : ["-50%", "0%"] }}
                                    transition={{
                                        duration: 50,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    {[...file.certificate, ...file.certificate].map((cert, i) => (
                                        <motion.div
                                            key={`${row}-${i}`}
                                            className="relative group w-64 h-48 flex-shrink-0"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <motion.img
                                                src={cert}
                                                className="w-full h-full object-contain"
                                                initial={{ filter: "blur(4px)", opacity: 0.7 }}
                                                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                                alt="Certificate"
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Component;