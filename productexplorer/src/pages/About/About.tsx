import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About Product Explorer</h2>

      <p className={styles.text}>
        Product Explorer is a simple React application built to demonstrate
        modern frontend concepts such as routing, data fetching, searching,
        and reusable UI components.
      </p>

      <p className={styles.text}>
        You can browse products, view detailed information, and experiment
        with features powered by TanStack Query such as caching, refetching,
        and dynamic search.
      </p>

      <p className={styles.text}>
        The app is built with Vite, TypeScript, React Query, and modular
        components for a clean and scalable architecture.
      </p>
    </div>
  );
}