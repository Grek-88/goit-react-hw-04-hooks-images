import React, { useState } from "react";
import s from "../Searchbar/Searchbar.module.css";

export default function Searchbar(props) {
  const [query, setQuery] = useState('');

  function inputQuery(ev) {
    ev.preventDefault();
    if (query === "") {
      alert("Для поиска необходимо ввести слово");
      return;
    }
    props.onSubmit(query);
    setQuery("");
  }

  function handelChange (ev){
    setQuery(ev.target.value.toLowerCase().trim());
  }

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={inputQuery}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handelChange}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
