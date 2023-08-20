export default function UserProfile({ params }: any) {
  return (
    <div className="flex bg-gray-400 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl py-2 text-slate-800">UserProfile</h1>
      <hr />
      <div className="shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <p className="text-2xl ml-2 px-2">
          Profile ID:{" "}
          <span className="shadow-lg shadow-slate-700/40 block p-2  ml-1 rounded bg-gray-500 text-black">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
