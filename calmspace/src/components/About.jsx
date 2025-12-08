import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About CalmSpace</h2>

      <p className={styles.text}>
        CalmSpace is a minimal digital workspace designed to help you breathe,
        focus, and work with intention. It encourages a gentle, distraction-free
        rhythm so you can stay centered while moving through your day.
      </p>

      <p className={styles.text}>
        Whether you're jotting down a daily intention, organizing simple tasks,
        or reflecting on your progress, CalmSpace gives you a clear and peaceful
        environment to support mindful productivity.
      </p>

      <p className={styles.text}>
        The goal is simple: create a workspace that feels calm, clean, and
        beautifully minimal — so your mind has room to breathe.
      </p>
    </div>
  );
}