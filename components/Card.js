import React, { useState, useEffect } from "react";
import Image from "next/image";

import { validateUrl, copyToClipboard } from "../libs/utils";
import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import Icon from "./Icon";
import List from "./List";

const features = [
  "Free to use",
  "Easy Link Shortening",
  "Full Link History",
  "Auto delete in 30 days",
];

export default function Card({ onSubmit, qrCodeUrl, encryptedUrl }) {
  const [givenUrl, setGivenUrl] = useState("");
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    setGivenUrl("");
    setIsWaiting(false);
  }, [qrCodeUrl]);

  function onSubmitLocal(e) {
    e.preventDefault();
    setIsWaiting(true);
    const result = validateUrl(givenUrl);

    if (result) {
      setInvalidUrl(true);
      setIsWaiting(false);
    } else {
      setInvalidUrl(false);
      onSubmit(givenUrl);
    }
  }

  return (
    <div className="w-full md:w-96 mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={onSubmitLocal}>
          <div>
            <Label
              iconType="link"
              htmlFor="url"
              text="Enter a long URL to make a Small"
            />
            <Input
              type="text"
              name="url"
              id="url"
              placeholder="https://somewebsite.com"
              value={givenUrl}
              onChange={(e) => setGivenUrl(e.target.value)}
              isRequired
              isError={invalidUrl}
              errorMessage="Invalid URL"
            />
            {encryptedUrl && (
              <p className="mt-5 text-center flex justify-between">
                <input
                  id="uri"
                  className="border-0 outline-none w-full"
                  type="text"
                  value={encryptedUrl}
                  readOnly
                />
                <Button
                  type="button"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                  onClick={copyToClipboard}
                  ariaLabel="Click to copy"
                >
                  <Icon type="copy" w="w-6" h="h-6" />
                </Button>
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isWaiting && <Icon type="loader" w="w-6" h="h-6" />} Make Small!
          </Button>
        </form>
        {qrCodeUrl && (
          <p className="mt-5 text-center">
            <Image src={qrCodeUrl} alt="QR code" width={148} height={148} />
          </p>
        )}
      </div>
      <List items={features} />
    </div>
  );
}
