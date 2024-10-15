import Art from '../../assets/Art.svg';

export default function QuizCategory() {
  return (
    <div className="relative w-24 h-24 flex flex-col justify-center items-center  overflow-hidden hover:cursor-pointer bg-blur-bg bg-cover bg-center rounded-xl">
      {/* Blurred background */}
      {/* <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-md"></div> */}
      {/* Main content */}
      <img src={Art} alt="Art logo" className="w-12 h-12 z-10" />
      <p className="text-white z-10">Art</p>
    </div>
  );
}
