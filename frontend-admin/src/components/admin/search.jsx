import ReactSearchBox from "react-search-box";
import { useState, useEffect } from "react";
import Table from "../table/Table";

export default function Search({ ...props }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e);
  };

  useEffect(() => {
    props.onSearch(query);
  }, [query]);

  return (
    <div>
      <input
        type="search"
        name=""
        id=""
        placeholder={props.placeholder}
        className={`tablesearch ${props.searchClass}`}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* <div>
        {query != "" ? (
          <>
            <ul>
              {finalData
                ?.filter((data) => data.value.toLowerCase().includes(query))
                .map((data) => {
                  return <li key={data.id}>{data.value}</li>;
                })}
            </ul>
          </>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
}
