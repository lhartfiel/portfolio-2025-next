"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../api/graphql/mutations";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, {
    variables: { name, email, message },
    onCompleted: (data) => {
      debugger;
      console.log("Message sent successfully", data);
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: (error) => {
      console.error("Error sending message", error);
    },
  });

  return (
    <>
      <h1>Contact</h1>
      {loading && "Loading..."}
      {error && <p style={{ color: "red" }}>Error sending message</p>}
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ border: "1px solid black", padding: "8px 24px" }}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: "1px solid black", padding: "8px 24px" }}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ border: "1px solid black", padding: "8px 24px" }}
          ></textarea>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          type="submit"
          style={{ backgroundColor: "lightgreen", padding: "8px 24px" }}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Contact;
