export default function TopicOption({ topic, handleClick, icon }) {
  return (
    <button
      onClick={() => handleClick(topic.name)}
      className={`flex flex-col w-32 h-24 items-center justify-center p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-md ${
        topic.name === 'Math' ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="w-12 h-12 mb-2">
        <img
          src={icon}
          alt="Description of the image"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      {topic.name}
    </button>
  );
}
