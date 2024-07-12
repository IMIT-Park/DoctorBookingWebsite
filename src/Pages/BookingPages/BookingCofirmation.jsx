import React, { useContext, useEffect } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UseContext";
import { formatTime } from "../../utils/FormatTime";
import { reverseFormatDate } from "../../utils/formatDate";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { setPageTitle, bookingCompleted, setBookingCompleted } =
    useContext(UserContext);

  useEffect(() => {
    setPageTitle("Booking Confirmation");
  }, []);

  const backtoHomeHandler = () => {
    setBookingCompleted(null);
    navigate("/");
  };

  useEffect(() => {
    if (!bookingCompleted) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Spacing lg={100} md={60} />
      <div className="container">
        <div className="booking_container">
          <div className="booking_form_card">
            <div className="booking_confirmation_container">
              <Spacing lg={30} md={50} />
              <div className="booking_confirmation_card_header">
                <p className="booking_confirmation_card_title">
                  Booking Confirmed
                </p>
              </div>

              <Spacing lg={20} md={10} />
              <div>
                <img
                  src="/images/verified.png"
                  alt="shape3"
                  className="booking_varified"
                />
              </div>

              <Spacing lg={40} md={30} />

              <div className="booking_confirmation_details">
                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Token
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">
                    {bookingCompleted?.newBooking?.token}
                  </div>
                </div>
                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Doctor's Name
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">
                    Dr. {bookingCompleted?.Doctor?.name}
                  </div>
                </div>

                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Clinic Name
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">
                    {bookingCompleted?.Clinic?.name}
                  </div>
                </div>
                {bookingCompleted?.newBooking?.schedule_date && (
                  <div className="booking_details_wrapper">
                    <div className="booking_confirmation_detail_label">
                      Date
                      <span>:</span>
                    </div>
                    <div className="booking_confirmation_value">
                      {reverseFormatDate(
                        bookingCompleted?.newBooking?.schedule_date
                      )}
                    </div>
                  </div>
                )}
                {bookingCompleted?.newBooking?.schedule_time && (
                  <div className="booking_details_wrapper">
                    <div className="booking_confirmation_detail_label">
                      Booking Time
                      <span>:</span>
                    </div>
                    <div className="booking_confirmation_value">
                      {formatTime(bookingCompleted?.newBooking?.schedule_time)}
                    </div>
                  </div>
                )}
              </div>

              <Spacing lg={40} md={30} />
              <div className="booking_form_card_btn_wrapper">
                <button
                  className="booking_form_card_btn"
                  onClick={backtoHomeHandler}
                >
                  Back to Home
                </button>
              </div>
              <Spacing lg={40} md={30} />
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default BookingConfirmation;
