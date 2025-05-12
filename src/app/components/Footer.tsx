const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-500 text-white text-center py-4 w-full">
      <div className="max-w-screen-2xl mx-auto">
        <p>copyright &copy; {currentYear}</p>
      </div>
    </footer>
  );
};
export default Footer;
