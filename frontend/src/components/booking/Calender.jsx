import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import Button from "@mui/material/Button";

export default function Calender() {
  let [range, setRange] = useState({
    // this is passed in the ranges field in the DateRangePicker component
    startDate: new Date(),
    endDate: new Date(),
    key: "selection", // identifier for that date range in the result,
    //  it could have been any name ,"seletion " is just
    // used as an identifier for the selected range
    color: "#f87171",
    autoFocus: true,
    showDateDisplay: true,
  });

  const handleSeletion = (ranges) => {
    setRange(ranges.selection);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("startDate" + range.startDate);
    console.log("endDate" + range.endDate);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Select a Date Range
      </h1>
      <div className="shadow-lg rounded-2xl overflow-hidden border border-gray-300 bg-white ">
        <form action="" onSubmit={handleSubmit}>
          <DateRangePicker
            ranges={[range]} // constains the range object for initial seletion , and also when the range is selected
            onChange={handleSeletion} // sets the range
            minDate={new Date()}
            // scroll={{ enabled: true }}
          />
          <Button
            size="small"
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              margin: "4px",
              background: "black",
            }}
          >
            Book now
          </Button>
        </form>
      </div>
    </div>
  );
}
//
