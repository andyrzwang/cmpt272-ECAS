import React from "react";

const ContactPage = () => {
  const styles = {
    profileContainer: {
      display: "flex",
      alignItems: "center",
      gap: "50px",
      marginTop: "50px",
      marginBottom: "50px",
    },
    profilePic: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      border: "2px solid black",
      overflow: "hidden",
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
    },
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profilePic}>
        <img src="sewy.png" alt="Profile Pic" style={styles.profilePicImg} />
      </div>
      <p style={styles.profileText}>
        Hi! My name is Aung Zaw Moe. I am in the data science program in SFU as
        of now. If needed my contact information is: azm3@sfu.ca
      </p>
    </div>
  );
};

export default ContactPage;