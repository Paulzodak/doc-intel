const GetStarted = () => {
  return (
    <div className="fslex text-black border-y-[1px] py-40">
      <div>
        <h1 className="text-5xl font-lora font-medium">See legal review in your workflow.</h1>
        <p className="mt-8 text-gray-500 text-lg tracksing-tight font-google-sans max-w-[65%]">
          We walk through how Qlarety fits intake, redlines, and approvals so your team can move
          agreements faster with clearer risk visibility and fewer back-and-forth cycles.
        </p>
      </div>
      <button className="mt-8 bg-primary-green text-legal-navy px-10 py-4 rounded-xl text-[13px] font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer">
        Start For Free
      </button>
    </div>
  );
};

export default GetStarted;
