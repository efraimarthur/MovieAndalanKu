import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Home = () => {
  //to get input value onchange
  const [searchval, setSearchval] = useState();

  //to store input value before button search pressed
  const [valSearch, setValSearch] = useState("Arthur");

  //When search button is clicked, set the valsearch value = input search value(searchval)
  const onSearch = () => {
    setValSearch(searchval);
  };
  // console.log(valSearch);
  // console.log(searchval);

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
      <div
        className="text-bg-dark justify-content-center d-flex"
        style={{ lineHeight: "100vh", fontSize: "30px" }}
      >
        loading...
      </div>
    );

  //set the final respons to hasil (ready to loop)
  const hasil = data.Search;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchval(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={onSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <h4 className="mt-4">
            You searched <b className="text-danger">{`"${valSearch}"`}</b>
          </h4>
        </div>
        <div className="row mt-3">
          <div className="d-flex flex-wrap gap-3">
            {!hasil ? (
              <div className="">
                <h4 className="mt-5"> {valSearch} Not Found</h4>
              </div>
            ) : (
              hasil.map((item) => (
                <>
                  <div
                    className="card shadow"
                    style={{ width: "16rem" }}
                    key={item.imdbID}
                  >
                    <img
                      src={item.Poster}
                      className="card-img-top"
                      style={{ cursor: "pointer" }}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.Title} ({item.Year})
                      </h5>
                      <p className="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ex possimus ab doloribus magnam ipsa perferendis!
                      </p>

                      <a href="#" className="btn btn-danger">
                        See Details
                      </a>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello darkness{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
