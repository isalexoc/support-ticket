import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input className="form-control" value={name} type="text" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input className="form-control" value={email} type="text" disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product"></label>
            <select
              name="product"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              id="product"
            >
              <option value="">Select Product</option>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              id="description"
              className="form-control"
              placeholder="Describe your issue here..."
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default NewTicket;
