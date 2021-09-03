import React, { useState, useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";
import s from "../App/App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import LoaderMore from "../Loader/Loader";

export default function App() {
  const [query, setQuery] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [bigurl, setBigurl] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchData();
  }, [query]);

  const submitForm = (dataQuery) => {
    setImgData(null);
    setPage(1);
    setQuery(dataQuery);
  };

  function fetchData() {
    setLoading(true);

    return fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=22269453-01e35d719392ba61f98a14ac3&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(
            "По такому запросу картинок не найдено. Введите другой запрос."
          )
        );
      })
      .then((imgDataFetch) => {
        console.log(imgDataFetch);
        console.log(page);
        setPage(page + 1);
        setImgData((imgData) =>
          imgData ? [...imgData, ...imgDataFetch.hits] : imgDataFetch.hits
        );
        setLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => setError(error));
  }

  const getNewImg = () => {
    fetchData();
  };

  const togleModalShow = (ev) => {
    if (!isOpenModal) {
      setBigurl(ev.target.dataset.bigurl);
    }
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={submitForm} />
      {error && <h3>{error.message}</h3>}
      {imgData && imgData.length === 0 && (
        <h3>По такому запросу картинок не найдено. Введите другой запрос.</h3>
      )}
      {!imgData && loading && <LoaderMore />}
      {imgData && imgData.length > 0 && (
        <>
          <ImageGallery images={imgData} onClick={togleModalShow} />
          {isOpenModal && <Modal showModal={togleModalShow} props={bigurl} />}
          {loading ? <LoaderMore /> : <Button onClick={getNewImg} />}
        </>
      )}
    </div>
  );
}
