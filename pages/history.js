import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "../components/Layout";

export default function History({ BASE_URL }) {
  const [myList, setMyList] = useState([]);

  async function getMyList(sessionId) {
    const results = await fetch(`/api/list/${sessionId}`);
    return results.json();
  }

  useEffect(() => {
    const existingVal = window.localStorage.getItem("uri:session_id");
    if (existingVal !== null) {
      const promise = getMyList(existingVal);
      promise.then((data) => setMyList(data));
    }
  }, []);

  return (
    <Layout>
      <h1 className="mb-5 dark:text-white text-black text-2xl">
        Welcome to MyShortURL
      </h1>
      <ul className="mb-5">
        <Link href="/">
          <a className="text-blue-600">Home</a>
        </Link>
      </ul>
      {myList && (
        <ul>
          {myList.map((obj) => (
            <li key={obj._id}>
              <a
                className="text-blue-600"
                href={`${BASE_URL}${obj.short_uri}`}
                rel="noreferrer"
                target="_blank"
              >{`${BASE_URL}${obj.short_uri}`}</a>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      BASE_URL: process.env.BASE_URL,
    },
  };
}