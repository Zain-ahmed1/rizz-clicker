import React from "react";

const ProgressBar = ({ progress, mewingActive }) => {
    return (
        <div className="w-20 -translate-y-1/2 h-[380px] absolute top-1/2 bg-[#695B59] rounded-full overflow-hidden mt-4">
            <div
                className={`absolute bottom-0 w-full h-full transition-all ${mewingActive ? "bg-blue-500" : "bg-green-500"
                    }`}
                style={{ height: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
