import { Link } from 'react-router-dom';

export default function Public() {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">TechFix Solutions!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Nestled in the vibrant heart of Tech City, TechFix Solutions offers a
          dedicated team poised to tackle all your technology repair
          requirements.
        </p>
        <address className="public__addr">
          TechFix Solutions
          <br />
          789 Market Avenue
          <br />
          City Central, CA 54321
          <br />
          <a href="tel:+15555555555">(555) 987-6543</a>
        </address>
        <br />
        <p>Owner: Jane Doe</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
}
