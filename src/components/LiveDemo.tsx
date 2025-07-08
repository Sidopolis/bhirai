import React, { useState, useRef, useEffect } from 'react';

// This component simulates BhīrAI's live detection and risk scoring
const getStatus = (score: number) => {
  if (score < 40) return { label: 'Safe', color: 'bg-green-600', text: 'text-green-400' };
  if (score < 70) return { label: 'Warning', color: 'bg-yellow-600', text: 'text-yellow-400' };
  return { label: 'Alert', color: 'bg-red-700', text: 'text-red-400' };
};

interface LiveDemoProps {
  onAlert?: (alert: string | null) => void;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ onAlert }) => {
  const [crowd, setCrowd] = useState(0);
  const [risk, setRisk] = useState(0);
  const [lastAlert, setLastAlert] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple motion detection and crowd estimation
  const analyzeVideo = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data for analysis
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple motion detection (count pixels that change significantly)
    let motionPixels = 0;
    let totalPixels = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Simple brightness-based motion detection
      const brightness = (r + g + b) / 3;
      if (brightness > 100) { // Threshold for "motion"
        motionPixels++;
      }
    }
    
    // Estimate crowd size based on motion density
    const motionRatio = motionPixels / totalPixels;
    const estimatedCrowd = Math.floor(motionRatio * 500); // Scale factor
    setCrowd(Math.max(0, Math.min(estimatedCrowd, 1000))); // Clamp between 0-1000
    
    // Calculate risk based on motion density and video properties
    const riskScore = Math.min(100, Math.floor(motionRatio * 200));
    setRisk(riskScore);
    
    // Generate alert if risk is high
    if (riskScore >= 70) {
      const alertMsg = `ALERT: High motion density detected at ${new Date().toLocaleTimeString()}`;
      setLastAlert(alertMsg);
      if (onAlert) onAlert(alertMsg);
    } else {
      setLastAlert(null);
      if (onAlert) onAlert(null);
    }
  };

  // Handle video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoName(file.name);
      setCrowd(0);
      setRisk(0);
      setLastAlert(null);
      setAnalysisProgress(0);
    }
  };

  // Start analysis when video is loaded
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const video = videoRef.current;
      video.onloadeddata = () => {
        setIsAnalyzing(true);
        setAnalysisProgress(0);
        
        // Simulate progress
        const progressInterval = setInterval(() => {
          setAnalysisProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 10;
          });
        }, 200);
        
        // Analyze video every 2 seconds
        const analysisInterval = setInterval(() => {
          if (video.readyState >= 2) { // HAVE_CURRENT_DATA
            analyzeVideo();
          }
        }, 2000);
        
        return () => {
          clearInterval(progressInterval);
          clearInterval(analysisInterval);
        };
      };
    }
  }, [videoUrl]);

  const status = getStatus(risk);

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border border-dark-700 p-8 flex flex-col items-center w-full shadow-xl">
      {/* Enhanced Video Upload */}
      <div className="w-full mb-8 flex flex-col items-center">
        <label className="block mb-3 text-gray-300 font-semibold text-lg">Upload a crowd video</label>
        <div className="w-full max-w-md">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-dark-700 file:to-dark-600 file:text-white hover:file:from-dark-600 hover:file:to-dark-500 file:transition-all file:duration-300 file:shadow-lg"
          />
        </div>
        {videoUrl && (
          <div className="w-full mt-6 flex flex-col items-center">
            <div className="relative w-full max-w-lg">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="rounded-xl border border-dark-700 max-h-80 w-full bg-black shadow-lg"
              />
              {isAnalyzing && (
                <div className="absolute top-4 left-4 bg-dark-900/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">Analyzing</span>
                  </div>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400 mt-2">{videoName}</span>
            {/* Hidden canvas for analysis */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        )}
      </div>
      
      {/* Enhanced Analysis Results */}
      <div className="w-full max-w-md space-y-6">
        {/* Progress Bar */}
        {isAnalyzing && videoUrl && (
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Analysis Progress</span>
              <span>{analysisProgress}%</span>
            </div>
            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Crowd Count */}
        <div className="text-center p-6 bg-dark-800/50 rounded-xl border border-dark-700">
          <div className="text-4xl font-bold text-white mb-1">{crowd}</div>
          <div className="text-gray-400 text-sm font-medium">Estimated People</div>
        </div>
        
        {/* Risk Score with enhanced bar */}
        <div className="p-6 bg-dark-800/50 rounded-xl border border-dark-700">
          <div className="flex justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">Motion Risk Score</span>
            <span className={`text-sm font-semibold ${status.text}`}>{status.label} ({risk}%)</span>
          </div>
          <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${status.color}`}
              style={{ width: `${risk}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Alert */}
      {lastAlert && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-700/50 rounded-xl text-red-400 text-sm text-center animate-pulse">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">ALERT</span>
          </div>
          {lastAlert}
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-6 text-center max-w-md">
        Note: This is a basic motion analysis demo. Real crowd detection requires advanced AI models.
      </div>
    </div>
  );
};

export default LiveDemo; 