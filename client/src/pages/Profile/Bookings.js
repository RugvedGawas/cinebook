import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Row, Table, Col } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings";
import moment from "moment";
import { useReactToPrint } from 'react-to-print';

function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
          <Col span={12}>
            <div className="card1 p-2 flex justify-between uppercase" ref={componentRef}>
              <div>
                
                <h1 className="text-xl">
                  {booking.show.movie.title} ({booking.show.movie.language})
                </h1>
                <div className="divider"></div>
                <h1 className="text-sm">
                  {booking.show.theatre.name} ({booking.show.theatre.address})
                </h1>
                <h1 className="text-sm">
                  Date & Time: {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                  - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </h1>
                {booking.show.FrontticketPrice+booking.show.BackticketPrice?( <div>
                  <h1 className="text-sm">
                 Front Seats Price : ₹ {booking.show.FrontticketPrice * booking.seats.length}
                </h1>
                <h1 className="text-sm">
                 Balcony Seats Price : ₹ {booking.show.BackticketPrice * booking.seatsB.length}
                </h1>
                <h1 className="text-sm">
                 Total Amount : ₹ {(booking.show.FrontticketPrice * booking.seats.length)+(booking.show.BackticketPrice * booking.seatsB.length) }
                </h1>
                </div>)

              :booking.show.BackticketPrice? (<div>
                  <h1 className="text-sm">
                 Front Seats Price : ₹ 0
                </h1>
                <h1 className="text-sm">
                 Balcony Seats Price : ₹ {booking.show.BackticketPrice * booking.seatsB.length}
                </h1>
                <h1 className="text-sm">
                 Total Amount : ₹ {(booking.show.BackticketPrice * booking.seatsB.length) }
                </h1>
                </div>):booking.show.FrontticketPrice?
                (<div>
                  <h1 className="text-sm">
                 Front Seats Price : ₹ {booking.show.FrontticketPrice * booking.seats.length}
                </h1>
                <h1 className="text-sm">
                 Balcony Seats Price : ₹ 0
                </h1>
                <h1 className="text-sm">
                 Total Amount : ₹ {(booking.show.FrontticketPrice * booking.seats.length)}
                </h1>
                </div>
              ):(<div>
                 
                </div>)}
       
                
                <h1 className="text-sm">Booking ID: {booking._id}</h1>
              </div>

              <div>
                <img
                  src={booking.show.movie.poster}
                  alt=""
                  height={100}
                  width={100}
                  className="br-1"
                />
                <h1 className="text-sm">Seat No : {booking.seats.join(", ")}</h1>
                <h1 className="text-sm">Balcony Seat No : {booking.seatsB.join(", ")}</h1>
              </div>
            </div>
            <button onClick={handlePrint}>Print Ticket</button>
            
          </Col>
       
        ))}
        </Row>

      

    </div>
  );
}

export default Bookings;