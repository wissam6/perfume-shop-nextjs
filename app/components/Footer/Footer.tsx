import * as React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <React.Fragment>
      <div
        style={{
          bottom: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgb(32, 37, 108)",
          display: "flex",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <div className={styles.footerDiv}>
          <h3 className={styles.footerTitle}>Contacts</h3>
          <ul>
            <li>Email</li>
            <li>Phone</li>
            <li>Fax</li>
          </ul>
        </div>
        <div className={styles.footerDiv} style={{ marginLeft: 0 }}>
          <h3 className={styles.footerTitle}>Social Media</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div className={styles.footerDiv} style={{ marginLeft: 0 }}>
          <h3 className={styles.footerTitle}>Get In Touch</h3>
          <ul>
            <li>Contact Us</li>
            <li>Give Feedback</li>
          </ul>
        </div>
      </div>
      <hr style={{ width: "90%" }} />
      <p style={{ paddingLeft: "5%", fontSize: "14px" }}>
        &copy; Golden Perfume 2024 | by Wissam Merhi
      </p>
    </React.Fragment>
  );
};
