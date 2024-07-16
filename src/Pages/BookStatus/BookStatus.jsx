import React, { useContext, useEffect, useState } from "react";
import { axiosApi } from "../../axiosInstance";
import { UserContext } from "../../Contexts/UseContext";
import { reverseFormatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/FormatTime";

const BookStatus = () => {
  const { setPageTitle, userDetails } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Booking Status");
  }, []);

  const userId = userDetails?.user_id;

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get(
          `/v1/booking/getallbooking/${userId}`
        );
        setBookings(response?.data?.consultations);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [userId]);

  return (
    <div>
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="details_wrapper">
          <div className="profile_details_container book_status-box">
            <div className="doctor_name">Booking Status</div>
            {loading ? (
              <div className="custom-loader_container">
                <span className="custom-loader"></span>
              </div>
            ) : (
              <>
                {bookings && bookings?.length > 0 ? (
                  <div
                    style={{ overflow: "auto", textAlign: "center" }}
                    className="table_parent"
                  >
                    <table className="table table_width">
                      <thead>
                        <tr className="table_head">
                          <th scope="col">Sl No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Token Number</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time</th>
                          <th scope="col">Doctor's Name</th>
                          <th scope="col">Clinic Name</th>
                          <th scope="col">Queue Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings?.map((booking, index) => (
                          <tr
                            key={booking?.booking?.booking_id}
                            className="table-row"
                          >
                            <td>{index + 1}</td>
                            <td style={{ textTransform: "capitalize" }}>
                              {booking?.booking?.Patient?.name}
                            </td>
                            <td>{booking?.booking?.token}</td>
                            <td>
                              {reverseFormatDate(
                                booking?.booking?.schedule_date
                              )}
                            </td>
                            {booking?.booking?.schedule_time && (
                              <td>
                                {formatTime(booking?.booking?.schedule_time)}
                              </td>
                            )}
                            <td>{booking?.booking?.Doctor?.name}</td>
                            <td>{booking?.booking?.Clinic?.name}</td>
                            <td className="queue_position">
                              {booking?.targetBookingPosition}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty_data">Data not found</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b90" />
    </div>
  );
};

export default BookStatus;
