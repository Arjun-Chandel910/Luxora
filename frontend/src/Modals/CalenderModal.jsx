import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DateRangePicker } from "react-date-range";
import Button from "@mui/material/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [range, setRange] = React.useState({
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
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        Book Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col items-center justify-center  bg-gray-100 rounded-4xl p-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Select a Date Range
            </h1>
            <div className="shadow-lg rounded-2xl overflow-hidden border border-gray-300 bg-white ">
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <div>
                  <DateRangePicker
                    ranges={[range]} // constains the range object for initial seletion , and also when the range is selected
                    onChange={handleSeletion} // sets the range
                    minDate={new Date()}
                    // scroll={{ enabled: true }}
                  />
                </div>
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{
                      margin: "4px",
                      background: "blue",
                      textAlign: "center",
                    }}
                  >
                    Book now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
