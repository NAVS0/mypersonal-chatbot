// DebugEnv.jsx
const DebugEnv = () => {
    return (
      <div style={{ padding: "10px", background: "#222", color: "#0f0", fontSize: "14px" }}>
        <strong>API URL (from env):</strong> {import.meta.env.VITE_API_URL || "Not Found"}
      </div>
    );
  };
  
  export default DebugEnv;
  