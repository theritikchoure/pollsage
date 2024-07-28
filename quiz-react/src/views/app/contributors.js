import React, { Fragment, useState } from "react";
import PageDetails from "../../components/_page_details";

const contributors = [
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  {
    name: "John Doe",
    image: "john-doe.jpg",
    username: "johndoe"
  },
  
];

const Home = () => {
  return (
    <>
      <PageDetails
        title="PollSage Contributors - Heart of PollSage"
        description="Pollsage is a free online polling platform that allows you to create polls and share them with your audience."
      />
      <section className="bg-gray-900 text-white">
        <div className="lg:px-48 lg:py-10">
          <div
            id="contributorsContainer"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-4 mb-4"
          >
            {contributors.map((contributor) => {
              return (
                <>
                  <div className="border border-gray-600 p-4 rounded h-auto">
                    <div className="mb-4">
                      <img
                        src="https://avatars.githubusercontent.com/u/56495602?v=4"
                        alt="alt"
                        className="w-full h-48 mx-auto"
                      />
                    </div>

                    <div className="text-lg font-bold">{contributor.name}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
