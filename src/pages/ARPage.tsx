const ARPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold">Halaman Augmented Reality</h1>
      <p className="mt-4">Kamera akan aktif di sini.</p>
      <a href="/" className="mt-8 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
        Kembali ke Menu Utama
      </a>
    </div>
  );
};

export default ARPage;
