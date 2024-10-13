const TopBar = () => {
  return (
    <div>
      <div className="w-screen h-[60px] text-sm fixed z-20 top-0 left-0 shadow-md dark:border-b bg-gray-100 flex justify-between border-b-2 border-[#1976D2]">
        <div className="ml-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-green-600">EcoTrack</h1>
        </div>

        <div className="flex items-center justify-end">
          <div className="relative flex w-fit gap-4 mr-8 items-center">
            <button className="w-10 h-10">
              <div className="text-sm text-gray-600">User Name</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
