// src/components/layout/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-4 border-t mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>National Taiwan University of Science and Technology</p>
        <p>Computer Graphics and Multimedia Laboratory</p>
        <p>© {currentYear} CGM lab.</p>
      </div>
    </footer>
  );
};

export default Footer;