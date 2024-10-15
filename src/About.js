import { useParams } from "react-router-dom";

function About() {
    const { name } = useParams(); // Get the 'name' parameter from the URL

    return (
      <div>
        <h1>About Page</h1>
        {name ? <p>Hello, {name}!</p> : <p>Learn more about us on this page.</p>}
      </div>
    );
  }
  
  export default About;
  