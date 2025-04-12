// src/components/layout/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-2 mt-auto border-t border-gray-200">
      <div className="px-4 text-left">
        <div style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "10px",
          color: "#606060"
        }}>
          <p className="m-0">National Taiwan University of Science and Technology</p>
          <p className="m-0">Computer Graphics and Multimedia Laboratory</p>
          <p className="m-0">© {currentYear} CGM lab.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;