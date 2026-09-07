export default function InfoText() {
  return (
    <div className="max-w-1/2 mx-auto py-6">
      <h1 className="text-center text-5xl font-medium">
        How do you <span className="text-blue-700 dark:text-sky-400">X </span>
        in <span className="text-red-400  dark:text-red-400">Y</span>?
      </h1>
      <p className="text-center w-3/5 mx-auto text-gray-300">
        Write a snippet of code that you would like to know how to write in
        another language
      </p>
    </div>
  );
}
