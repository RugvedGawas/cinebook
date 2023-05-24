import { message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetShowById } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";
import { BookShowTickets, MakePayment } from "../../apicalls/bookings";


function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [selectedSeats1, setSelectedSeats1] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({
        showId: params.id,
      });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalFrontSeats = show.totalFrontSeats;
    const rows = Math.ceil(totalFrontSeats / columns);
    const totalBackSeats = show.totalBackSeats;
    const rows1 = Math.ceil(totalBackSeats / columns);

    return (
      <div className="flex gap-1 flex-col p-2 card1">
        <div class="screen"> </div>
          {Array.from(Array(rows).keys()).map((seat, index) => {
            return (
              <div className="flex gap-1 justify-center">
                {Array.from(Array(columns).keys()).map((column, index) => {
                  const seatNumber = seat * columns + column + 1;
                  let seatClass = "seat";

                  if (selectedSeats.includes(seat * columns + column + 1)) {
                    seatClass = seatClass + " selected-seat";
                  }

                  if (show.bookedSeats.includes(seat * columns + column + 1)) {
                    seatClass = seatClass + " booked-seat";
                  }

                return (
                  seat * columns + column + 1 <= totalFrontSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  
                  )
                );
              })}
            </div>
            
          );
        
        

        })}
        
        <hr/>        

        {Array.from(Array(rows1).keys()).map((seat, index) => {
            return (
              <div className="flex gap-1 justify-center">
                {Array.from(Array(columns).keys()).map((column, index) => {
                  const seatNumber = seat * columns + column + 1;
                  let seatClass = "seat";

                  if (selectedSeats1.includes(seat * columns + column + 1)) {
                    seatClass = seatClass + " selected-seat";
                  }

                  if (show.bookedSeatsB.includes(seat * columns + column + 1)) {
                    seatClass = seatClass + " booked-seat";
                  }

                return (
                  seat * columns + column + 1 <= totalBackSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats1.includes(seatNumber)) {
                          setSelectedSeats1(
                            selectedSeats1.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats1([...selectedSeats1, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  
                  )
                );
              })}
            </div>
            
          );
        })}
      </div>
    );
  };

  

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        seatsB: selectedSeats1, 
        transactionId,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length  * show.FrontticketPrice + selectedSeats1.length + show.BackticketPrice * 100
      );

      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    show && (
      <div>
        {/* show infomation */}

        <div className="flex justify-between p-2 items-center">
          <div>
            <h1 className="text-xl">{show.theatre.name}</h1>
            <h1 className="text-lg">{show.theatre.address}</h1>
          </div>

          <div className="ml-4">
            <h1 className="text-3xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>

          <div>
            <h1 className="text-lg">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

        {/* seats */}

        <div className="flex justify-center mt-2">{getSeats()}</div>
        {selectedSeats.length > 0 && selectedSeats1.length > 0 ? (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card1 p-2 gap-3">
                <h1 className="text-sm">
                <h1 className="text-sm"><b>Selected &nbsp; Front &nbsp; Seat &nbsp; Numbers</b> : {selectedSeats.join(" , ") }</h1>
                <h1 className="text-sm"><b>Selected &nbsp; Balcony &nbsp; Seat &nbsp; Numbers</b> : {selectedSeats1.join(" , ") }</h1>
                 <b> Total Price</b> : {selectedSeats.length * show.FrontticketPrice + selectedSeats1.length * show.BackticketPrice } 
                </h1>
              </div>
            </div>
            <StripeCheckout
              currency="INR"
              token={onToken}
              amount={(selectedSeats.length * show.FrontticketPrice * 100) + (selectedSeats1.length * show.BackticketPrice * 100)}
              billingAddress
              stripeKey="pk_test_51MppJfJdWJI2lfpolFMKqb8G2uoTEXCa5a5KxenAgjCqewBbogcwBRmrySLg3rXFtSv9XJAvN17r0Dlrxn6Scpsr00poeKYoeU"
            >
              <Button title="Book Now" />
            </StripeCheckout>
          </div>
        ): selectedSeats1.length>0 ?(
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card1 p-2 gap-3">
                <h1 className="text-sm">
                <h1 className="text-sm"><b>Selected &nbsp; Balcony &nbsp; Seat &nbsp; Numbers</b> : {selectedSeats1.join(" , ") }</h1>
                 <b> Total Price</b> : {selectedSeats1.length * show.BackticketPrice } 
                </h1>
              </div>
            </div>
            <StripeCheckout
              currency="INR"
              token={onToken}
              amount={selectedSeats1.length  * show.BackticketPrice * 100}
              billingAddress
              stripeKey="pk_test_51MppJfJdWJI2lfpolFMKqb8G2uoTEXCa5a5KxenAgjCqewBbogcwBRmrySLg3rXFtSv9XJAvN17r0Dlrxn6Scpsr00poeKYoeU"
            >
              <Button title="Book Now" />
            </StripeCheckout>
          </div>
          
        ):selectedSeats.length > 0 ? (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card1 p-2 gap-3">
                <h1 className="text-sm">
                <h1 className="text-sm"><b>Selected &nbsp; Seat &nbsp; Numbers</b> : {selectedSeats.join(" , ") }</h1>
                 <b> Total Price</b> : {selectedSeats.length * show.FrontticketPrice } 
                </h1>
              </div>
            </div>
            <StripeCheckout
              currency="INR"
              token={onToken}
              amount={selectedSeats.length  * show.FrontticketPrice * 100}
              billingAddress
              stripeKey="pk_test_51MppJfJdWJI2lfpolFMKqb8G2uoTEXCa5a5KxenAgjCqewBbogcwBRmrySLg3rXFtSv9XJAvN17r0Dlrxn6Scpsr00poeKYoeU"
            >
              <Button title="Book Now" />
            </StripeCheckout>
          </div>
          
        
        ):(<div></div>)}
        

      </div>
    )
  );
}

export default BookShow;
