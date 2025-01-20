"use client";

import { debounce } from "lodash";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
  useMemo,
} from "react";
import useGetAdvocates from "../_queries/getAdvocates";

export default function AdvocateTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data, isLoading } = useGetAdvocates({
    searchTerm: debouncedSearchTerm,
  });

  const onInput = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const debouncedInputUpdate = useMemo(
    () => debounce(setDebouncedSearchTerm, 500),
    []
  );

  useEffect(() => {
    debouncedInputUpdate(searchTerm);
  }, [debouncedInputUpdate, searchTerm]);

  const onClick = useCallback(() => {
    console.log(data?.data);
    setSearchTerm("");
  }, [data?.data]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 w-max">
        <span className="col-span-2">Search</span>
        <input
          className="input input-bordered"
          onChange={onInput}
          value={searchTerm}
        />
        <button className="btn" onClick={onClick}>
          Reset Search
        </button>
        <p className="row-span-2">
          Searching for: <span id="search-term">{debouncedSearchTerm}</span>
        </p>
      </div>
      <br />
      <br />
      <table className="w-full table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        {/*
          It would be nice to memoize this. At lower volumes this is fine, but this rerender could
          get expensive. This should also leverage Tanstack Table and Tanstack Virtualize.
        */}
        <tbody>
          {isLoading ? (
            <div className="loading" />
          ) : (
            data?.data.map((advocate) => {
              return (
                <tr key={advocate.id}>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    <ul>
                      {Object.entries(advocate.specialties).map(([k, v]) => (
                        <li key={k}>• {v}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
