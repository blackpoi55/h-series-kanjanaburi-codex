import React from 'react';

export default function HealthModal({ isOpen, onClose, result }) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-xl z-50 overflow-hidden"
            onClick={onClose} // ✅ กดพื้นหลังเพื่อปิด Modal
        >
            {/* 🎇 Particle Glow Effect (ป้องกันบังปุ่ม `✖`) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-blue-500 opacity-20 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-purple-500 opacity-20 blur-[120px] animate-pulse"></div>
            </div>

            {/* 🎆 Modal Content */}
            <div 
                className="relative bg-gradient-to-br from-white/10 to-gray-900/30 backdrop-blur-2xl border border-gray-700/50 rounded-3xl max-w-4xl w-full p-10 animate-slideUp shadow-[0px_0px_30px_5px_rgba(0,255,255,0.4)] transition-transform duration-500 ease-out transform hover:scale-[1.02]"
                onClick={(e) => e.stopPropagation()} // ✅ ป้องกันปิด Modal ถ้าคลิกข้างใน
            >
                {/* 🌟 Outer Neon Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl opacity-50 blur-lg pointer-events-none"></div>

                {/* 🔥 Close Button `✖` (ยกขึ้นมาเหนือทุกเลเยอร์) */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-5 text-white text-3xl font-bold hover:text-red-500 transition-transform transform hover:scale-125 z-50"
                >
                    ✖
                </button>

                {/* AI Logo + Header */}
                <div className="relative flex flex-col items-center text-center">
                    <img src="/images/careai.png" alt="AI Logo" 
                         className="w-32 h-32 mb-5 drop-shadow-2xl animate-float glow-neon" />
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg tracking-wider">
                        🔍 AI Health Analysis
                    </h2>
                </div>

                {/* 📜 Content */}
                <div className="relative mt-6 max-h-[500px] overflow-y-auto p-6 bg-gray-900/80 text-white rounded-2xl shadow-inner border border-gray-500/40 custom-scrollbar">
                    <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, "<br>") }}></p>
                </div>

                {/* ✅ Footer Button */}
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={onClose} 
                        className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition transform hover:scale-110 shadow-xl hover:shadow-[0px_0px_20px_5px_rgba(0,255,127,0.5)]">
                        🩺 ดูแลสุขภาพต่อ
                    </button>
                </div>
            </div>
        </div>
    );
}
