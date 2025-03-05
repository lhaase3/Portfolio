// const ResumePage = () => {
//   return (
// <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black !important">

//       {/* Resume Content */}
//       <div className="relative z-10 flex flex-col items-center bg-black/80 p-8 rounded-lg shadow-lg max-w-4xl w-full border border-purple-500">
//         <h1 className="text-3xl font-bold text-black mb-4">My Resume</h1>

//         {/* PDF Viewer */}
//         {/* <iframe
//           src="/resume.pdf"
//           className="w-full h-[90vh] border rounded-lg"
//         /> */}

//         {/* Download Button */}
//         <a
//           href="/resume.pdf"
//           download="Logan_Haase.pdf"
//           className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
//         >
//           Download Resume
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ResumePage;



const ResumePage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black p-6">
      {/* Resume Viewer Container */}
      <div className="relative z-10 flex flex-col items-center bg-black/90 p-6 rounded-xl shadow-2xl max-w-5xl w-full border border-purple-500">
        <h1 className="text-3xl font-bold text-white mb-4">My Resume</h1>

        {/* Image Preview of Resume */}
        <img
          src="/resume-image.png"  // Make sure to place this image in `public/`
          alt="Resume Preview"
          // className="w-fit rounded-lg shadow-lg border-50 border-gray-600"
        />

        {/* Button Container */}
        <div className="flex justify-between w-full mt-6">
          {/* Back Button */}
          <a
            href="/"
            className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Back
          </a>

          {/* Download PDF Button */}
          <a
            href="/resume.pdf"
            download="My_Resume.pdf"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;

