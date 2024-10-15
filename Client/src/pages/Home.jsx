export default function HomePage() {
  return (
    <>
      <div className="relative bg-custom-bg bg-cover bg-center h-screen">
        {/* Blurred overlay */}
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

        {/* Content container */}
        <div className="grid md:grid-cols-2 grid-cols-1 h-full">
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Unleash Your Inner Wizard of Wisdom
            </h2>
            <p className="text-lg md:text-xl max-w-lg mb-8">
              Embark on a Journey of Knowledge Exploration with Our Extensive
              Collection of Interactive Quizzes.
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
