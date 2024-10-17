export default function Alert({ handleYes, handleNo, mainText, subText }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg">{mainText}</h3>
        <p className="font-semibold opacity-40">{subText}</p>
        <div className="flex flex-row gap-5 mt-5">
          <button
            onClick={handleYes}
            className="bg-green-600 rounded px-6 py-2"
          >
            Yes
          </button>
          <button onClick={handleNo} className="bg-red-600 rounded px-6 py-2">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
