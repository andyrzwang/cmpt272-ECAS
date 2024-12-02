import React from "react";
import Navbar from "./Navbar";
import pic1 from "../assets/pic1.png";


export const people = [

  {
    name: "Aung Zaw Moe",
    contact: "azm3@sfu.ca",
    description: 
      "Hi! My name is Aung Zaw Moe. I am in the data science program in SFU. I like playing football and listening to music!",
    pic: pic1,
  },

  {
    //add your code here
  },

  {
    //add your code here
  },

  {
    //add your code here
  },

  {
    //add your code here
  },

];

export const ContactPage = () => {
  const styles = {

    pageContainer: {
      backgroundColor: " #f8f4e3",
      minHeight: "100vh",
      padding: "20px",
    },

    container: {
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },

    profileContainer: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap", 
      gap: "10px",
      marginTop: "5px",
      marginBottom: "5px",
    },

    profilePic: {
      width: "150px",
      height: "150px",
      border: "2px solid black",
      overflow: "hidden",
      transition: "transform 0.3s ease",
    },

    profilePicImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    profileText: {
      fontSize: "16px",
      lineHeight: "1.5",
      fontFamily: `"Times New Roman", "Roboto", Serif`,
      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
    },

  };

  return (
    <div style={styles.container}>
      <Navbar/>
      {people.map((person, index) => (
        <div key={index} style={styles.profileContainer}>
          <div style={styles.profilePic}>
            <img
              src={person.pic}
              alt={`Profile Pic of ${person.name}`}
              style={styles.profilePicImg}
            />
          </div>
          <p style={styles.profileText}>
            {person.description} <br />
            Feel free to contact me at: <strong>{person.contact}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};
// export default ContactPage;