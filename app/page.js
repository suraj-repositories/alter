"use client";

import { useState } from "react";
import "./page.css";

export default function Home() {
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

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }

      const data = JSON.parse(text);

      setResponse(data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="container">
        {/* LEFT CARD */}
        <div className="card">
          <div className="badge">AI Video Translator</div>

          <h1 className="title">Upload Your Video</h1>

          <p className="subtitle">
            Extract audio and translate videos into your desired language
          </p>

          <label className="uploadBox">
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />

            {video ? (
              <div>
                <p className="fileName">{video.name}</p>

                <p className="fileSize">
                  {(video.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <div className="uploadIcon">⬆</div>

                <p className="uploadText">
                  Click to Select Video
                </p>

                <p className="uploadSubtext">
                  MP4, MOV, AVI supported
                </p>
              </div>
            )}
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="uploadButton"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </div>

        {/* RIGHT CARD */}
        {response && (
          <div className="previewCard">
            <h2 className="previewTitle">
              Processed Media
            </h2>

            <div className="mediaSection">
              <p className="mediaLabel">Uploaded Video</p>

              <video
                controls
                className="videoPlayer"
                src={response.data.video_url}
              />
            </div>

            <div className="mediaSection">
              <p className="mediaLabel">Extracted Audio</p>

              <audio
                controls
                className="audioPlayer"
                src={response.data.audio_url}
              />
            </div>

            <div className="responseBox">
              <h3 className="responseTitle">
                Server Response
              </h3>

              <pre className="responseText">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}