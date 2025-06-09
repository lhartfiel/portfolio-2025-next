import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_HIGH_FIVE } from "src/app/api/graphql/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurst } from "@fortawesome/free-solid-svg-icons";

const HomeImg = ({
  image,
  highFiveCount,
  id,
}: {
  image: string;
  highFiveCount: number | undefined;
  id: number | undefined;
}) => {
  const [highFiveNum, setHighFiveNum] = useState(highFiveCount);
  const [highFiveActive, setHighFiveActive] = useState(false);
  const [twirlOut, setTwirlOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showHighFiveCount, { error }] = useMutation(SEND_HIGH_FIVE, {
    variables: { id },
    optimisticResponse: {
      __typename: "Mutation",
      updateHighFiveCount: {
        __typename: "HighFive",
        ok: true,
        home: {
          __typename: "Home",
          id,
          highFiveCount: (highFiveNum ?? 0) + 1,
        },
      },
    },
    update: (_, { data }) => {
      const count = data?.updateHighFiveCount?.home?.highFiveCount;
      if (count != null) {
        setHighFiveNum(count);
      }
    },
    onCompleted: () => {
      setHighFiveActive(true);
      setTimeout(() => {
        setTwirlOut(true);
      }, 4000);
      setTimeout(() => {
        setHighFiveActive(false);
        setTwirlOut(false);
      }, 5000);
    },
    onError: (err) => {
      setErrorMessage(
        "Oops! Looks like we missed each other. Please try again!"
      );
      console.error("Error sending message", err, error);
    },
  });

  return (
    <>
      <img
        useMap="#selfmap"
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image}`}
        alt=""
        width="600"
        height="600"
        className="rounded-full object-contain object-center"
      />
      {highFiveActive && (
        <div className="absolute -left-[6%] -bottom-[13%] md:left-[10%] md:bottom-[20%] z-20">
          <div
            className={`flex justify-center wrapper relative ${
              twirlOut ? "animate-twirl-out" : "animate-twirl-in"
            } `}
          >
            <FontAwesomeIcon
              icon={faBurst}
              className="text-[160px] lg:text-[220px] text-primary"
            />
            {errorMessage && (
              <p className="text-body-min-sm lg:text-body-min text-white font-medium absolute top-[50%] -translate-y-[50%] max-w-[100px] lg:max-w-[120px] mx-auto text-center">
                errorMessage
              </p>
            )}
            <p
              className={`${
                highFiveNum !== highFiveCount
                  ? "text-body-min-sm lg:text-body-min"
                  : "hidden"
              }  text-white font-medium absolute top-[50%] -translate-y-[50%] max-w-[100px] lg:max-w-[120px] mx-auto text-center`}
            >
              Thank you.{" "}
              <span className="font-black relative inline px-[5px]">
                {highFiveNum}
              </span>
              high fives received!
            </p>
          </div>
        </div>
      )}
      <map name="selfmap">
        <area
          onClick={(e) => {
            e.preventDefault();
            setHighFiveNum((prev) => (prev ? (prev += 1) : 1));
            showHighFiveCount();
          }}
          target=""
          alt=""
          title=""
          href="#"
          coords="18,95,260,732"
          shape="rect"
        ></area>
      </map>
    </>
  );
};

export { HomeImg };
