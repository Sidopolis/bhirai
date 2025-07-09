import React, { useRef, useEffect, useState } from 'react';

const YOLO_API_URL = 'http://localhost:8000/detect';

const getStatus = (score: number) => {
  if (score < 3) return { label: 'Safe', color: 'bg-green-600', text: 'text-green-400' };
  if (score < 7) return { label: 'Warning', color: 'bg-yellow-600', text: 'text-yellow-400' };
  return { label: 'Alert', color: 'bg-red-700', text: 'text-red-400' };
};

const MAX_HISTORY = 60;
const SMOOTHING_WINDOW = 5;

const LiveWebcamDemo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crowd, setCrowd] = useState(0);
  const [risk, setRisk] = useState(0);
  const [riskHistory, setRiskHistory] = useState<number[]>([]);
  const [lastAlert, setLastAlert] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [alertSent, setAlertSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [crowdHistory, setCrowdHistory] = useState<number[]>([]);
  const [trajectories, setTrajectories] = useState<{[id: string]: {points: [number, number][], lastSeen: number, panic?: boolean}}>(() => ({}));
  const [locationCoords, setLocationCoords] = useState<{lat: number, lon: number} | null>(null);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline'>('online');
  const [panicAlert, setPanicAlert] = useState<string | null>(null);
  const [panicSnapshot, setPanicSnapshot] = useState<string | null>(null);
  const [panicFrames, setPanicFrames] = useState(0);

  // Start webcam on mount
  useEffect(() => {
    let stream: MediaStream | null = null;
    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsActive(true);
      } catch (err) {
        setIsActive(false);
      }
    };
    startWebcam();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Get geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocationCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setLocationCoords(null),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // Backend status check (ping every 5s)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const check = async () => {
      try {
        const res = await fetch('http://localhost:8000/docs');
        setBackendStatus(res.ok ? 'online' : 'offline');
      } catch {
        setBackendStatus('offline');
      }
    };
    check();
    interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  // Throttled YOLO detection via backend (1 per second)
  useEffect(() => {
    let raf: number;
    let alertDebounce = 0;
    let lastDetection = 0;
    let detectionTimeout: NodeJS.Timeout;
    let isUnmounted = false;

    const detect = async () => {
      if (!videoRef.current || !canvasRef.current || !isActive) {
        raf = requestAnimationFrame(detect);
        return;
      }
      const now = Date.now();
      if (now - lastDetection < 1000) {
        raf = requestAnimationFrame(detect);
        return;
      }
      lastDetection = now;
      setProcessing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setProcessing(false);
        raf = requestAnimationFrame(detect);
        return;
      }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setProcessing(false);
          return;
        }
        const formData = new FormData();
        formData.append('file', blob, 'frame.jpg');
        try {
          const res = await fetch(YOLO_API_URL, {
            method: 'POST',
            body: formData,
          });
          if (!res.ok) throw new Error('Detection failed');
          const data = await res.json();
          const people = data.detections.filter((d: any) => d.class_name === 'person');
          setCrowd(people.length);
          setRisk(people.length);
          setRiskHistory(hist => {
            const newHist = [...hist, people.length];
            return newHist.length > MAX_HISTORY ? newHist.slice(-MAX_HISTORY) : newHist;
          });
          // Debounce alert: only trigger if high risk for 3+ consecutive checks
          if (people.length >= 7) {
            alertDebounce++;
            if (alertDebounce >= 3) {
              setLastAlert(`ALERT: Crowd detected (${people.length} people) at ${new Date().toLocaleTimeString()}`);
            }
          } else {
            alertDebounce = 0;
            setLastAlert(null);
          }
          // Draw boxes
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          data.detections.forEach((det: any) => {
            const [x1, y1, x2, y2] = det.bbox;
            ctx.strokeStyle = det.class_name === 'person' ? '#00FF00' : '#FF00FF';
            ctx.lineWidth = 2;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            ctx.font = '16px Inter, Arial, sans-serif';
            ctx.fillStyle = '#fff';
            ctx.fillText(`${det.class_name} (${(det.confidence*100).toFixed(1)}%)`, x1, y1 - 6);
          });
          setCrowdHistory(hist => {
            const newHist = [...hist, people.length];
            return newHist.length > SMOOTHING_WINDOW ? newHist.slice(-SMOOTHING_WINDOW) : newHist;
          });
          const nowTs = Date.now();
          const newTrajectories: {[id: string]: {points: [number, number][], lastSeen: number, panic?: boolean}} = {...trajectories};
          people.forEach((det: any, idx: number) => {
            // Use the center of the bbox as the point
            const [x1, y1, x2, y2] = det.bbox;
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const rx = Math.abs(x2 - x1) / 2;
            const ry = Math.abs(y2 - y1) / 2;
            const id = `person_${idx}`;
            if (!newTrajectories[id]) newTrajectories[id] = { points: [], lastSeen: nowTs };
            newTrajectories[id].points.push([cx, cy]);
            if (newTrajectories[id].points.length > 30) newTrajectories[id].points.shift();
            newTrajectories[id].lastSeen = nowTs;
          });
          // Remove old tracks
          Object.keys(newTrajectories).forEach(id => {
            if (nowTs - newTrajectories[id].lastSeen > 5000) delete newTrajectories[id];
          });
          setTrajectories(newTrajectories);
          // Draw trajectories
          let panicDetected = false;
          Object.values(newTrajectories).forEach(track => {
            ctx.beginPath();
            ctx.strokeStyle = track.points.length > 5 ? 'rgba(255,0,0,0.9)' : 'rgba(255, 255, 0, 0.7)';
            ctx.lineWidth = 2;
            track.points.forEach(([x, y], i) => {
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            });
            ctx.stroke();
            if (track.points.length > 5) {
              // Calculate average speed (distance between last 5 points)
              let speed = 0;
              for (let i = track.points.length - 5; i < track.points.length - 1; i++) {
                if (i < 0) continue;
                const [x1, y1] = track.points[i];
                const [x2, y2] = track.points[i + 1];
                speed += Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
              }
              speed /= 4;
              if (speed > 30) { // Threshold for "panic" movement
                panicDetected = true;
                // Highlight this trajectory in red
                track.panic = true;
              } else {
                track.panic = false;
              }
            }
          });
          setPanicAlert(panicDetected ? 'Panic movement detected! Someone is moving erratically.' : null);
          people.forEach((det: any) => {
            const [x1, y1, x2, y2] = det.bbox;
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const rx = Math.abs(x2 - x1) / 2;
            const ry = Math.abs(y2 - y1) / 2;
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx * 1.2, ry * 1.2, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            ctx.restore();
          });
          if (panicDetected) {
            setPanicFrames(f => f + 1);
            if (panicFrames === 2 && canvas) {
              // Capture snapshot as data URL
              setPanicSnapshot(canvas.toDataURL('image/jpeg', 0.8));
            }
          } else {
            setPanicFrames(0);
            setPanicSnapshot(null);
          }
        } catch (err) {
          // Optionally show error
        }
        setProcessing(false);
        if (!isUnmounted) {
          detectionTimeout = setTimeout(() => {
            raf = requestAnimationFrame(detect);
          }, 1000);
        }
      }, 'image/jpeg', 0.7);
    };
    setLoading(false);
    raf = requestAnimationFrame(detect);
    return () => {
      isUnmounted = true;
      cancelAnimationFrame(raf);
      if (detectionTimeout) clearTimeout(detectionTimeout);
    };
  }, [isActive]);

  const status = getStatus(risk);

  const handleSendAlert = () => {
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSent(true);
    setTimeout(() => {
      setShowModal(false);
      setAlertSent(false);
      setContact('');
      setLocation('');
    }, 2500);
  };

  const smoothedCrowd = Math.round((crowdHistory.reduce((a, b) => a + b, 0) + crowd) / (crowdHistory.length + 1));

  return (
    <div className="min-h-screen flex flex-col items-center bg-dark-900 py-12 px-4" style={{ minHeight: '100vh', marginTop: '6.5rem' }}>
      {/* Development Status Banner */}
      <div className="w-full max-w-xl mb-6 bg-dark-800 border border-yellow-600 text-yellow-300 text-sm rounded-lg px-6 py-3 text-center shadow-md">
        <strong>Heads up!</strong> The Live AI Demo is still under active development. Things might change or break as we roll out new updates, but we’re working hard to make it better every day. Thanks for your patience!
      </div>
      <div className="max-w-xl w-full bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border border-dark-700 p-8 shadow-xl mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Live AI Crowd Demo</h2>
        <p className="text-gray-400 mb-8 text-center">Experience real-time crowd analysis and safety alerting.</p>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <div className="text-white text-lg font-semibold">Connecting to AI server…</div>
          </div>
        ) : (
        <>
        <div className="w-full flex flex-col items-center mb-8">
          <div className="relative w-full max-w-lg aspect-video bg-black rounded-xl border border-dark-700 overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-lg font-semibold">Webcam unavailable. <button className='ml-2 underline' onClick={()=>window.location.reload()}>Retry</button></div>
            )}
            {processing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg font-semibold z-10">Processing…</div>
            )}
          </div>
        </div>
        <div className="w-full max-w-md mx-auto space-y-6 pb-16">
          <div className="text-center p-6 bg-dark-800/50 rounded-xl border border-dark-700">
            <div className="text-4xl font-bold text-white mb-1">{smoothedCrowd}</div>
            <div className="text-gray-400 text-sm font-medium">Estimated People</div>
          </div>
          <div className="p-6 bg-dark-800/50 rounded-xl border border-dark-700">
            <div className="flex justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">Crowd Risk Level</span>
              <span className={`text-sm font-semibold ${status.text}`}>{status.label} ({risk})</span>
            </div>
            <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ease-out ${status.color}`}
                style={{ width: `${Math.min(risk * 14, 100)}%` }}
              ></div>
            </div>
          </div>
          {/* Risk Timeline */}
          <div className="p-4 bg-dark-800/50 rounded-xl border border-dark-700">
            <div className="text-gray-400 text-xs mb-2">Risk Timeline (last 60s)</div>
            <svg width="100%" height="40" viewBox={`0 0 120 ${Math.max(...riskHistory, 10) + 5}`} className="w-full h-10">
              <polyline
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                points={riskHistory.map((r, i) => `${i * 2},${40 - r * 4}`).join(' ')}
              />
            </svg>
          </div>
          {lastAlert && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-700/50 rounded-xl text-red-400 text-sm text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">ALERT</span>
              </div>
              {lastAlert}
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={handleSendAlert}
              >
                Send Alert to Safety Center
              </button>
            </div>
          )}
          {/* Backend status indicator */}
          <div className="flex items-center justify-center mb-4">
            <span className={`w-3 h-3 rounded-full mr-2 ${backendStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className={`text-xs font-semibold ${backendStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>{backendStatus === 'online' ? 'AI Server Online' : 'AI Server Offline'}</span>
          </div>
          {/* Panic alert */}
          {panicAlert && (
            <div className="mb-4 p-3 bg-red-900/80 border border-red-700 rounded-xl text-red-300 text-center font-bold animate-pulse">
              {panicAlert}
              {panicSnapshot && (
                <div className="mt-2 flex justify-center">
                  <img src={panicSnapshot} alt="Panic snapshot" className="rounded-lg border border-red-700 max-w-xs" />
                </div>
              )}
            </div>
          )}
        </div>
        {/* Modal for contact/location info */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-dark-800 p-8 rounded-xl shadow-xl border border-dark-700 w-full max-w-sm">
              <h3 className="text-lg font-bold text-white mb-4 text-center">Send Emergency Alert</h3>
              <label className="block mb-2 text-gray-300">Your Contact Info
                <input type="text" required value={contact} onChange={e => setContact(e.target.value)} className="mt-1 w-full p-2 rounded bg-dark-900 border border-dark-700 text-white" placeholder="Phone or Email" />
              </label>
              <label className="block mb-4 text-gray-300">Your Location
                <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="mt-1 w-full p-2 rounded bg-dark-900 border border-dark-700 text-white" placeholder="Address or Area" />
              </label>
              {locationCoords && (
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Detected Location:</div>
                  <div className="text-sm text-white mb-2">Lat: {locationCoords.lat.toFixed(5)}, Lon: {locationCoords.lon.toFixed(5)}</div>
                  <img
                    src={`https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${locationCoords.lon},${locationCoords.lat}&z=15&size=300,200&l=map&pt=${locationCoords.lon},${locationCoords.lat},pm2rdm`}
                    alt="Map location"
                    className="rounded-lg border border-dark-700 mx-auto"
                    width={300}
                    height={200}
                  />
                </div>
              )}
              <button type="submit" className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold">Send Alert</button>
              {alertSent && <div className="mt-4 text-green-400 text-center">Alert sent to nearest safety center!</div>}
              <button type="button" className="mt-4 w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default LiveWebcamDemo;