import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DateRange } from "react-date-range";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import FlashContext from "../context/FlashContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function CalenderModal({ id, token }) {
  const { showFlash } = React.useContext(FlashContext);
  const navigate = useNavigate();
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = "auto";
  };
  const handleClose = () => setOpen(false);
  let [bookings, setBookings] = React.useState([]);

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

  //fetching all the bookings for the listings
  React.useEffect(() => {
    const fetchBooking = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        console.error("Unauthorized: No token");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/listing/${id}/booking`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "auth-token": `${token}`,
          },
        }
      );
      const data = await response.json();

      setBookings(data);
    };
    fetchBooking();
  }, [id]);
  // console.log(bookings);
  React.useEffect(() => {
    const book = bookings.map((d) => ({
      fromDate: d.fromDate,
      toDate: d.toDate,
    }));
  }, [bookings]);

  // Range Selection and sending it to backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.error("Unauthorized: No token");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/listing/${id}/booking`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": `${token}`,
        },
        body: JSON.stringify({
          startDate: range.startDate,
          endDate: range.endDate,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    async function payNow() {
      // Open Razorpay Checkout and the handler function verifies the payment in the backend
      const options = {
        key: razorpayKey, // Replace with your Razorpay key_id
        amount: data.totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: data.razorpayOrderId, // This is the order_id created in the backend
        handler: async function (response) {
          //this runs automatically after the payment
          const token = localStorage.getItem("auth-token");
          if (!token) {
            console.error("Unauthorized: No token");
            return;
          }
          const result = await fetch("http://localhost:3000/payment-success", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "auth-token": `${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const data = await result.json();

          if (data.success) {
            console.log("Payment verified");

            handleClose();
            navigate("/profile");
          } else {
            alert("Payment verification failed. Don't be a fraud.");
          }
        },

        prefill: {
          name: "Arjun Chandel",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options); // Initialize razorpay checkout
      //  instance with order details( opens secure payment UI)
      rzp.open();
    }
    payNow();
    document.body.style.overflow = "auto";
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  //disabled dates calculation
  const disabled = [];
  bookings.map((obj) => {
    const start = new Date(obj.fromDate);
    const end = new Date(obj.toDate);
    while (start <= end) {
      disabled.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
  });
  const handleBookNow = () => {
    if (token) {
      handleOpen();
    } else {
      showFlash({ success: false, message: "You need to be logged in first!" });
      navigate("/login");
    }
  };
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // always restore on unmount
    };
  }, []);

  return (
    <div>
      <Button onClick={handleBookNow} variant="contained" size="small">
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
                  <DateRange
                    ranges={[range]} // constains the range object for initial seletion , and also when the range is selected
                    onChange={handleSeletion} // sets the range
                    minDate={new Date()}
                    disabledDates={disabled}
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
                    {" "}
                    Book now{" "}
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
