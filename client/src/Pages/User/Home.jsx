import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="flex justify-center">
          <img src="/EduVerse.png" alt="EduVerse_Logo" />

          </div>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          An offline-first, online-enhanced AI Teacher making education
          accessible, inclusive, and resilient for every child — anywhere in the world.
        </p>
        <button onClick={() => navigate('/chat')} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition">
          🚀 Try Demo
        </button>
      </section>

      {/* Problem Statement */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">🚨 A Major Problem That Is Faced 🚨</h2>
        <p className="text-lg leading-relaxed text-center">
          250M+ children globally lack access to quality teachers, especially in
          rural and underserved regions. Current AI tutors are internet-heavy,
          English-centric, and not designed for disabilities or low-resource
          settings. This causes significant inconvinience for children that do not have English as a strong suit.
          Hence resulting in the losing interest of children.
        </p>
      </section>

      {/* Solution Section with Animations */}
      <section className="bg-indigo-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">💡 Our Solution 💡</h2>
          <p className="text-lg mb-6 text-center">
            EduVerse is an offline-first, online-enhanced AI Teacher designed
            to provide universal, inclusive, and resilient education.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 bg-white rounded-2xl shadow transition duration-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-xl mb-3">📚 Learn & Solve</h3>
              <p>Offline textbooks, math solvers, and step-by-step problem help.</p>
            </motion.div>
            <motion.div
              className="p-6 bg-white rounded-2xl shadow transition duration-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-xl mb-3">🤟 Accessibility</h3>
              <p>Sign-language avatar, captions, dark/light toggle and emotion-aware tutoring.</p>
            </motion.div>
            <motion.div
              className="p-6 bg-white rounded-2xl shadow transition duration-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-xl mb-3">🧭 Career Compass</h3>
              <p>Offline career mapping + online job market insights.</p>
            </motion.div>
            <motion.div
              className="p-6 bg-white rounded-2xl shadow transition duration-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-xl mb-3">⚡ Skill Builder</h3>
              <p>Questioning the student, 15-min bite-sized learning modules, offline & online.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-indigo-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">🎯 Impact & Vision</h2>
        <p className="max-w-3xl mx-auto text-lg">
          EduVerse is more than a hackathon project — it’s a step toward
          building a universal AI teacher: multilingual, inclusive, adaptive, and
          resilient against barriers of geography, language, or disability.
        </p>
      </section>
    </div>
  );
}
