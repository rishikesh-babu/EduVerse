export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 text-gray-800">
      <br />
      <br />
      <div className="flex justify-center">
      <img src="/EduVerse.png" alt="EduVerse_Logo" />
      </div>
      {/* Who We Are */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-indigo-700">👩‍💻 Who We Are</h1>
        <p className="text-lg max-w-3xl mx-auto mb-12">
          We’re a passionate team of Computer Science students and builders who came together for
          this hackathon with one goal — to make learning accessible for every
          child, no matter where they are.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Teammate 1", role: "Founder & Developer", fact: "Loves turning weekend ideas into working prototypes." },
            { name: "Teammate 2", role: "AI Engineer", fact: "Inspired by the dream of teaching kids in their own language." },
            { name: "Teammate 3", role: "UI/UX Designer", fact: "Believes tech should be beautiful *and* inclusive." },
            { name: "Teammate 4", role: "Backend Developer", fact: "Wants a clean backend."}
          ].map((member, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow transform transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-bold text-xl mt-4">{member.name}</h3>
              <p className="text-indigo-600">{member.role}</p>
              <p className="text-gray-600 text-sm mt-2">“{member.fact}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Behind the Idea */}
      <section className="max-w-5xl mx-auto px-6 py-12items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-indigo-600 text-center">📖 The Story Behind the Idea 📖</h2>
          <p className="text-lg leading-relaxed">
            EduVerse started as a hackathon spark — an idea born from seeing
            students struggle during power cuts and weak internet.  
            In just 24 hours time, we transformed that problem into a working
            prototype that learns, teaches, and adapts offline.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">🚨 The Problem We’re Solving 🚨</h2>
        <p className="text-lg leading-relaxed">
          Millions of kids lack reliable internet and teachers.  
          Current AI tutors don’t work offline, ignore local languages, and
          exclude children with disabilities.  
          We chose this challenge because <span className="font-semibold underline">education should never stop</span>.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">🎯 Our Mission 🎯</h2>
        <p className="text-xl font-medium">
          “We want to ensure kids in rural areas can learn even without internet.”
        </p>
      </section>

      {/* Vision Beyond Hackathon */}
      <section className="bg-indigo-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">🚀 Vision Beyond the Hackathon</h2>
        <p className="max-w-3xl mx-auto text-lg">
          If given the chance, we’ll scale EduVerse into a universal,
          offline-first AI teacher — multilingual, inclusive, and resilient —
          so that <span className="font-semibold">every child, everywhere can learn without limits</span>.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6">
          Be part of our journey 🎓
        </h2>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transform transition duration-300 hover:scale-105">
          🚀 Try the Demo
        </button>
      </section>
    </div>
  );
}
