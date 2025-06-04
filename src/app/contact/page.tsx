"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../api/graphql/mutations";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const checkmarkIcon = (
  <div className="flex items-center justify-center aspect-square shrink-0 bg-secondary w-6 h-6 md:w-8 md:h-8 rounded-full mr-2">
    <FontAwesomeIcon
      icon={faCheck}
      className="text-primary text-xl md:text-2xl"
    />
  </div>
);

const Contact = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, {
    variables: { name, email, message },
    onCompleted: (data) => {
      debugger;
      console.log("Message sent successfully", data);
      setName("");
      setEmail("");
      setMessage("");
      setSubmissionMessage(
        "Thank you! Your message has been successfully sent."
      );
    },
    onError: (error) => {
      setSubmissionMessage("Error sending message. Please try again later.");
      console.error("Error sending message", error);
    },
  });

  return (
    <section className="grid grid-cols-4 flex-1 md:grid-cols-8 px-10 gap-x-4 lg:grid-cols-12 w-full bg-primary lg:bg-transparent">
      <h1 className="col-span-4 md:col-start-3 lg:col-span-12 w-full text-center text-h1-sm lg:text-h1 text-white lg:text-primary font-kanit mt-16">
        Say Hey!
      </h1>
      <p className="w-full col-span-4 md:col-start-3 lg:col-span-6 lg:col-start-4 text-intro-sm lg:text-intro text-white lg:text-black text-center mt-6 mb-3 lg:mb-12">
        Have questions? Curious about an opportunity to work together? Please
        fill out the form below and I’ll get back to you within 3 days.
      </p>
      <form className="w-full py-12 col-span-4 md:col-start-3 col-start-1 lg:col-span-8 lg:col-start-3 lg:grid lg:grid-cols-8 lg:mb-12 mx-auto justify-center bg-primary">
        <div className="col-span-4 col-start-1 md:col-span-6 md:col-start-2 text-center mb-6">
          {loading && "Loading..."}
          {error && <p style={{ color: "red" }}>Error sending message</p>}
          {submissionMessage && (
            <div className="flex items-start justify-center text-white text-body-sm md:text-body text-center">
              {checkmarkIcon}
              <p className="flex flex-wrap">{submissionMessage}</p>
            </div>
          )}
        </div>
        <div className="wrapper text-center col-span-4 col-start-1 lg:col-span-4 lg:col-start-3 w-full">
          <div>
            <label className="text-white" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                border: "1px solid black",
                padding: "8px 24px",
                height: "60px",
                borderRadius: "7px",
                backgroundColor: "white",
                marginBottom: "24px",
                width: "100%",
              }}
            />
          </div>
          <div>
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "1px solid black",
                padding: "8px 24px",
                height: "60px",
                borderRadius: "7px",
                backgroundColor: "white",
                marginBottom: "24px",
                width: "100%",
              }}
            />
          </div>
          <div>
            <label className="text-white text-left" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                border: "1px solid black",
                padding: "8px 24px",
                height: "180px",
                borderRadius: "7px",
                backgroundColor: "white",
                marginBottom: "24px",
                width: "100%",
              }}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <Button
              type="primary"
              size="large"
              callback={sendMessage}
              text="Send Message"
              customClass="inline-block"
            ></Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Contact;
