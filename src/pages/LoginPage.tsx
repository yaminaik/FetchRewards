import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Dog, Mail, User } from "lucide-react";
import toast from "react-hot-toast"; // ✅ Importing toast correctly

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ Use useCallback to optimize function reference
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });
    const responseBody = await response.text(); 
    console.log("Login Response Status:", response.status);
    console.log("Login Response Body:", responseBody);

      if (!response.ok) throw new Error("Authentication failed. Please check your details.");

      toast.success(`Woof! Welcome back, ${name}! 🐾`); // ✅ Toast should work now
      onLogin();
      navigate("/search");
    } catch (err) {
      setError("Failed to log in. Please try again.");
      toast.error("Failed to log in. Please try again."); // ✅ Error toast should now appear
    }
  }, [name, email, navigate, onLogin]);

  return (
    <div className="w-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Dog className="h-16 w-16 text-primary animate-bounce" />
          </div>
          <h1>Find Your Perfect Dog</h1>
          <p className="text-muted">Enter your details to start your journey</p>
        </div>

        <div className="backdrop-blur-md bg-background/80 p-8 rounded-2xl shadow-xl border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-muted rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-muted rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <Dog className="group-hover:animate-bounce" />
              Start Your Journey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
