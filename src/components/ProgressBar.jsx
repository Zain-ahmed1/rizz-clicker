import React from "react";

const ProgressBar = ({ progress, mewingActive }) => {
    return (
        <div className="w-64 bg-gray-300 rounded-full overflow-hidden mt-4">
            <div
                className={`h-4 transition-all ${mewingActive ? "bg-blue-500" : "bg-green-500"
                    }`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
