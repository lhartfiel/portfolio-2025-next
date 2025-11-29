"use client";
import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../api/graphql/mutations";
import { isSpamMessage } from "@/utils/spamDetector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const checkmarkIcon = (
  <div className="flex items-center justify-center aspect-square shrink-0 bg-secondary w-6 h-6 md:w-8 md:h-8 rounded-full mr-2">
    <FontAwesomeIcon
      icon={faCheck}
      className="text-primary text-xl md:text-2xl"
    />
  </div>
);
const errorIcon = (
  <div className="flex items-center justify-center aspect-square shrink-0 bg-tertiary w-6 h-6 md:w-8 md:h-8 rounded-full mr-2">
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      className="text-primary text-xl md:text-1xl"
    />
  </div>
);

const Contact = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState({
    success: true,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Simple sanitization function to strip HTML tags
  const sanitizeInput = (input: string): string => {
    if (!input) return "";
    return input
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/[<>]/g, "") // Remove any remaining < or >
      .trim();
  };

  const verifyEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(value)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please provide a valid email address");
    }
    return setEmail(value);
  };

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    variables: {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    },
    onCompleted: (data) => {
      if (!data || !data.createContact || !data.createContact.ok) {
        setSubmissionMessage({
          success: false,
          message: "Error sending message. Please check your input.",
        });
        return;
      }

      console.log("Message sent successfully", data);
      setName("");
      setEmail("");
      setMessage("");
      setSubmissionMessage({
        success: true,
        message: "Thank you! Your message has been successfully sent.",
      });
    },
    onError: (error) => {
      console.error("Error sending message", error);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.error("GraphQL Errors:", error.graphQLErrors);
        setSubmissionMessage({
          success: false,
          message: `Error sending message. ${error.graphQLErrors[0].message}.`,
        });
      } else if (error.networkError !== null && error.networkError?.message) {
        console.error("Network Error:", error.networkError);
        setSubmissionMessage({
          success: false,
          message: `Error sending message. ${error.networkError.message}.`,
        });
      } else {
        setSubmissionMessage({
          success: false,
          message: "Error sending message. Please try again.",
        });
      }
    },
  });

  const sendMessageWrapper = useCallback(() => {
    // Check for spam before sending
    const { isSpam, reason } = isSpamMessage(name, email, message);
    if (isSpam) {
      setSubmissionMessage({
        success: false,
        message: `Unable to send message: ${reason}. Please ensure your message contains valid text.`,
      });
      return;
    }

    sendMessage();
  }, [sendMessage, name, email, message, setSubmissionMessage]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessageWrapper();
    },
    [sendMessageWrapper]
  );

  return (
    <section className="grid grid-cols-4 flex-1 md:grid-cols-8 px-10 gap-x-4 lg:grid-cols-12 w-full bg-primary lg:bg-transparent">
      <h1 className="col-span-4 md:col-start-3 lg:col-span-12 w-full text-center text-h1-sm lg:text-h1 text-white lg:text-primary font-kanit mt-16">
        Say Hey!
      </h1>
      <p className="w-full col-span-4 md:col-start-3 lg:col-span-6 lg:col-start-4 text-intro-sm lg:text-intro text-white lg:text-black text-center mt-6 mb-3 lg:mb-12">
        Have questions? Curious about an opportunity to work together? Please
        fill out the form below and I’ll get back to you within 3 days.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full py-12 col-span-4 md:col-start-3 col-start-1 lg:col-span-8 lg:col-start-3 lg:grid lg:grid-cols-8 lg:mb-12 mx-auto justify-center bg-primary"
      >
        <div className="col-span-4 col-start-1 md:col-span-6 md:col-start-2 text-center mb-6">
          {loading && <p data-testid="loading">Loading...</p>}
          {submissionMessage.message && (
            <div
              data-testid="submission-message"
              className="flex items-start justify-center text-white text-body-sm md:text-body text-center"
            >
              {submissionMessage.success ? checkmarkIcon : errorIcon}
              <p className="flex flex-wrap">{submissionMessage.message}</p>
            </div>
          )}
        </div>
        <div className="wrapper text-left col-span-4 col-start-1 lg:col-span-4 lg:col-start-3 w-full">
          <div className="mb-6">
            <label className="text-white" htmlFor="name">
              Name *
            </label>
            <input
              placeholder="Your Name"
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[60px] rounded-[7px] py-2 px-6 border-1 border-black bg-white"
            />
          </div>
          <div className="mb-6">
            <label className="text-white" htmlFor="email">
              Email *
            </label>
            <input
              placeholder="Your Email"
              type="email"
              id="email"
              name="email"
              value={email}
              className="w-full h-[60px] rounded-[7px] py-2 px-6 border-1 border-black bg-white"
              onChange={(e) => verifyEmail(e)}
            />
            {errorMessage && (
              <p className="text-tertiary font-bold mt-2">{errorMessage}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="text-white text-left" htmlFor="message">
              Message *
            </label>
            <textarea
              placeholder="A short message"
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-[180px] rounded-[7px] py-2 px-6 border-1 border-black bg-white"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                !name || !email || !message || errorMessage ? true : false
              }
              className={`group relative inline-block font-kanit font-bold rounded-[20px] transition duration-300 ease-in-out w-[230px] py-[9px] ${
                !name || !email || !message || errorMessage
                  ? "bg-portfolio-gray cursor-not-allowed text-black"
                  : "bg-accent border-1 border-accent text-black hover:brightness-110 hover:shadow-btn cursor-pointer"
              }`}
            >
              <span className="relative flex items-center justify-center">
                Send Message
                {!(!name || !email || !message || errorMessage) && (
                  <span className="opacity-0 absolute transition-all duration-300 right-[32px] group-hover:right-4 group-hover:opacity-100 h-[20px]">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Contact;
