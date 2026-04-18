import piko from "@nrichardsdev/piko-sdk";
import { useProfile } from "@nrichardsdev/piko-sdk/react";

export default function App() {
  const { profile, loading, error } = useProfile();

  const letter = profile?.username[0]?.toUpperCase() ?? "?";
  const color = profile?.image_data ?? "#E60012";

  return (
    <div style={styles.root}>
      <h1 style={styles.title}>
        <span style={{ color: "#E60012" }}>Pi</span>ko
      </h1>

      <div style={styles.card}>
        {loading && <p style={styles.dim}>Loading…</p>}

        {error && <p style={{ color: "#E60012" }}>Could not load profile</p>}

        {!loading && !error && (
          <>
            <div style={{ ...styles.avatar, background: color }}>{letter}</div>
            <p style={styles.username}>{profile?.username ?? "—"}</p>
            <p style={styles.dim}>
              {profile?.first_name
                ? `Welcome back, ${profile.first_name}!`
                : "Welcome back!"}
            </p>
          </>
        )}
      </div>

      <button style={styles.btn} onClick={() => piko.close()}>
        ← Back to Piko
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Outfit', system-ui, sans-serif",
  },
  title: { margin: 0, fontSize: "2.5rem", fontWeight: 800 },
  card: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: "1rem",
    padding: "2rem 3rem",
    textAlign: "center",
    minWidth: "18rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  avatar: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "0.5rem",
  },
  username: { margin: 0, fontSize: "1.25rem", fontWeight: 700 },
  dim: { margin: 0, color: "#555", fontSize: "0.85rem" },
  btn: {
    padding: "0.75rem 2rem",
    borderRadius: "0.5rem",
    border: "none",
    background: "#E60012",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
  },
};
