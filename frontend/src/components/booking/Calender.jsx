import { DateRangePicker } from "react-date-range";

export default function Calender() {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">
        Select a Date Range
      </h1>
      <div className="shadow-lg rounded-2xl overflow-hidden border border-gray-300 bg-white ">
        <DateRangePicker ranges={[selectionRange]} />
      </div>
    </div>
  );
}
//
