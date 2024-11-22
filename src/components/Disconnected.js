const Disconnected = () => {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-3xl font-bold text-red-500">Woops!</h1>
      <p className="text-xl font-bold text-slate-600">
        No Internet Connection.
      </p>
    </div>
  );
};

export default Disconnected;
