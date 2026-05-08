```jsx id="gk9x2p"
import { useState } from "react";

export default function App() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/videos/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResponse(data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>AI Video Translator</div>

        <h1 style={styles.title}>Upload Your Video</h1>

        <p style={styles.subtitle}>
          Extract audio and translate videos into your desired language
        </p>

        <label style={styles.uploadBox}>
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={(e) => setVideo(e.target.files[0])}
          />

          {video ? (
            <div>
              <p style={styles.fileName}>{video.name}</p>

              <p style={styles.fileSize}>
                {(video.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <div style={styles.uploadIcon}>⬆</div>

              <p style={styles.uploadText}>Click to Select Video</p>

              <p style={styles.uploadSubtext}>
                MP4, MOV, AVI supported
              </p>
            </div>
          )}
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        {response && (
          <div style={styles.response}>
            <h3 style={styles.responseTitle}>Server Response</h3>

            <pre style={styles.pre}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #fff7ed 0%, #fffbeb 50%, #ffffff 100%)",
    padding: "20px",
    fontFamily: "Inter, Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "540px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    border: "1px solid #fed7aa",
    boxShadow: "0 20px 50px rgba(251, 146, 60, 0.15)",
  },

  badge: {
    display: "inline-block",
    background: "#fff7ed",
    color: "#ea580c",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "18px",
    border: "1px solid #fdba74",
  },

  title: {
    margin: "0",
    fontSize: "38px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "12px",
    marginBottom: "32px",
    lineHeight: "1.6",
    fontSize: "16px",
  },

  uploadBox: {
    border: "2px dashed #fdba74",
    background: "#fffaf5",
    borderRadius: "18px",
    padding: "50px 20px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "24px",
    display: "block",
    transition: "0.3s",
  },

  uploadIcon: {
    fontSize: "42px",
    marginBottom: "10px",
    color: "#f97316",
  },

  uploadText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0",
  },

  uploadSubtext: {
    color: "#9ca3af",
    marginTop: "10px",
    fontSize: "14px",
  },

  fileName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ea580c",
  },

  fileSize: {
    color: "#6b7280",
    marginTop: "8px",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(249, 115, 22, 0.25)",
  },

  response: {
    marginTop: "28px",
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    padding: "18px",
    borderRadius: "16px",
    overflow: "auto",
  },

  responseTitle: {
    marginTop: 0,
    color: "#9a3412",
  },

  pre: {
    margin: 0,
    color: "#7c2d12",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
  },
};
```
