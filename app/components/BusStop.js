 export default function BusStop() {
    return (
        <div>
            <div>
                <span>Stopping Point</span>
            </div>
            <div className="flex items-center border p-2 rounded mt-1">
                <input
                    type="text"
                    placeholder="One address per line"
                    className="flex-grow outline-none"
                />
            </div>
            <div className="mt-3">
                <span>Number of cars (Up to 4)</span>
            </div>
            <div className="w-28 items-center border p-3 rounded mt-1">
                <input
                    type="number"
                    min={0}
                    className="w-24 outline-none"
                    placeholder="0"
                />
            </div>
            <div className="mt-3">
                <span>Bus Stop</span>
            </div>
            <div className="flex items-center border p-2 rounded mt-1">
                <input
                    type="text"
                    placeholder="Bus Stop Station 1"
                    className="flex-grow outline-none"
                />
            </div>
            <div className="flex items-center border p-2 rounded mt-3">
                <input
                    type="text"
                    placeholder="Bus Stop Station 2"
                    className="flex-grow outline-none"
                />
            </div>
            <div className="flex items-center border p-2 rounded mt-3">
                <input
                    type="text"
                    placeholder="Bus Stop Station 3"
                    className="flex-grow outline-none"
                />
            </div>
            <div className="mt-7">
                <span>Students</span>
            </div>
            <div className="flex items-center border p-2 rounded mt-1">
                <input
                    type="text"
                    placeholder="Students Number 1"
                    className="flex-grow outline-none" />
            </div>
            <div className="flex items-center border p-2 rounded mt-3">
                <input
                    type="text"
                    placeholder="Students Number 2"
                    className="flex-grow outline-none" />
            </div>
        </div>
    );
 }