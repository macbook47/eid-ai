import { useState } from "react";

export default function SplashScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center p-8 rounded-2xl">
        <div className="mb-6">
          <span className="text-6xl inline-block animate-pulse">🌙✨</span>
        </div>
        <h1 className="text-4xl font-bold text-emerald-600 mb-4">
          eid mubarrak 1446
        </h1>
        <p className="text-slate-600 text-sm mb-2">
        kadang perbedaan itu sering terjadi.. baik dalam pikiran maupun pilihan..
        </p>
        <p className="text-slate-600 text-sm mb-2">
        namun di hari yang fitri ini.. mari kita buka pintu hati..
        </p>
        <p className="text-slate-600 text-sm mb-2">
        layaknya benang-benang yang terurai.. kita rangkai kembali dalam ikatan persaudaraan.. kita temukan kesamaan di dalam perbedaan..
        </p>
        <p className="text-slate-600 text-sm mb-2">
        semoga Idul Fitri tahun ini, menjadi momen yang menguatkan tali silaturahmi..
        </p>
        <p className="text-slate-600 text-sm mb-8">
        dan biarkan kami membantu anda, membuat ucapan dengan teknologi
        </p>
        <p className="text-slate-600 text-sm mb-8">
        - hormat kami Faizudin Al Hamawi dan Keluarga 🙏🏻 -
        </p>
        <button
          onClick={onClose}
          className="shine-effect bg-emerald-600 rounded-xl text-white font-medium px-6 py-3 hover:bg-emerald-700 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg"
        >
          Mulai Buat Ucapan ✨
        </button>
      </div>
    </div>
  );
} 