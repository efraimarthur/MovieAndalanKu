import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [detailCard, setDetailCard] = useState({});
  const [scroll, setScroll] = useState(1);

  //to get input value onchange
  const [searchval, setSearchval] = useState();

  //to store input value before button search pressed
  const [valSearch, setValSearch] = useState("");

  //When search button is clicked, set the valsearch value = input search value(searchval)
  const onSearch = () => {
    setValSearch(searchval);
  };
  // console.log(valSearch);
  // console.log(searchval);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 700;
      if (scroll !== scrollCheck) {
        setScroll(scrollCheck);
        // console.log(scrollCheck);
      }
    });
  });

  // Fetch data using SWR
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `http://www.omdbapi.com/?apikey=47e16fc6&s=${valSearch}`,
    fetcher
  );

  //error if wrong url
  if (error) return <div>failed to load</div>;
  //while waiting the data
  if (!data)
    return (
      // console.log("data belum ada")
      <>
        <div
          style={{ minHeight: "100vh", fontSize: "30px", paddingTop: "300px" }}
          className="text-bg-dark justify-content-center d-flex text-danger fw-bold flex-row gap-3"
        >
          <p className="">Loading</p>
          <h3 className="spinner-grow text-danger mt-2"></h3>
          <h3 className="spinner-grow text-warning mt-2"></h3>
          <h3 className="spinner-grow text-success mt-2"></h3>
        </div>
      </>
    );

  //set the final respons to hasil (ready to loop)
  const hasil = data.Search;

  //when detail button on click, set modal to show(true), and set items attributes to detailcard
  const detailOnClick = (item) => {
    // console.log(item);
    const cardz = {
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      image: item.Poster,
      type: item.Type,
    };
    setShow(true);
    setDetailCard(cardz);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>MovieAndalanKU</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/movieIcon32.png" />
      </Head>
      <div className="">
        {scroll ? null : (
          <span className="fixed-bottom text-decoration-none me-2">
            {/* {console.log("muncul")} */}
            <a
              href="#"
              className="btn-up float-end mb-5 p-1 bg-primary rounded-circle"
            >
              <Icon icon="noto:rocket" width="50" height="50" />
            </a>
          </span>
        )}
        <main className={styles.main}>
          <div className="row justify-content-center">
            <div className="col-md-12 py-3 text-start text-danger">
              <Link
                href="/"
                className="fw-bold fs-3 text-decoration-none text-danger"
              >
                Movie
                <span className="fw-normal text-white">Andalan</span>
                KU
              </Link>
            </div>
            <div className="col-md-12 py-3 text-center text-danger mb-2">
              <h3 className="fw-bold">Find Movies</h3>
            </div>
            <div className="col-md-5">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  // className="bg-dark"
                  type="search"
                  placeholder="Search the Title"
                  aria-label="Search"
                  onChange={(e) => setSearchval(e.target.value)}
                />
                <Link href={""} passHref>
                  <button
                    href="#"
                    className="btn btn-danger"
                    type="submit"
                    onClick={onSearch}
                  >
                    Search
                  </button>
                </Link>
              </form>
            </div>
          </div>
          {/* <div className="row">
            <h4 className="mt-4 text-white">
              You searched <b className="text-danger">{`"${valSearch}"`}</b>
            </h4>
          </div> */}
          <div className="row mt-3">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              {!hasil ? (
                <div className="text-white mt-5 fs-4 fw-semibold">
                  {!valSearch ? null : (
                    <div>
                      <span className="text-danger">{valSearch}</span>
                      <span> NotFound</span>
                    </div>
                  )}
                </div>
              ) : (
                ((
                  <div className="row bg-white">
                    <h4 className="mt-4 text-white">
                      You searched{" "}
                      <b className="text-danger">{`"${valSearch}"`}</b>
                    </h4>
                  </div>
                ),
                hasil.map((item) => (
                  <div
                    className="card shadow bg-bro bg-dark"
                    style={{ width: "16rem" }}
                    key={item.imdbID}
                  >
                    <a className="gambar" onClick={() => detailOnClick(item)}>
                      <img
                        src={item.Poster}
                        className="card-img-top"
                        style={{
                          cursor: "pointer",
                          height: "25rem",
                        }}
                        alt="Image.png"
                      />
                    </a>
                    <div className="card-body bg-bro2 bg-opacity-75 text-center">
                      <h5 className="card-title text-white text-center">
                        {item.Title}
                      </h5>
                      <a
                        className="btn btn-danger mt-3"
                        onClick={() => detailOnClick(item)}
                      >
                        Show Details
                      </a>

                      <Modal
                        show={show}
                        size="lg"
                        centered
                        onHide={handleClose}
                        className="bg-whit/e"
                      >
                        <Modal.Header
                          closeButton
                          className="bg-dark text-white"
                        >
                          <Modal.Title>
                            Title :{" "}
                            <span className="fw-bold text-danger">
                              {detailCard.title}
                            </span>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark">
                          <div className="d-flex flex-wrap mt-sm-5 flex-md-row bg-dark">
                            <img
                              src={detailCard.image}
                              width="200px"
                              height="300px"
                              alt="gmbar"
                              className=""
                            />
                            <div className="ms-0 border border-end-0 border-top-0 border-bottom-0 border-4 border-danger ps-2 mt-md-0 mt-3 ms-md-2 text-white">
                              <p className="">
                                <b className="fw-bold">Title : </b>
                                {detailCard.title}
                              </p>
                              <p className="">
                                <b className="fw-bold">Published Year : </b>
                                {detailCard.year}
                              </p>
                              <p className="">
                                <b className="fw-bold">Type : </b>
                                {detailCard.type}
                              </p>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer className="bg-dark">
                          <Button variant="danger" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                )))
              )}
            </div>
          </div>
        </main>
      </div>
      <footer className={`${styles.footer} border-top border-danger`}>
        <span className="fw-bold text-white ">
          Made by <b className="fw-bold text-danger">Arthur Efraim</b>
        </span>
      </footer>
    </div>
  );
};

export default Home;
