import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {

  return (

    <>

      <Navbar />

      <main
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {children}
      </main>

    </>

  );

}