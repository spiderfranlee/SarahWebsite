import React, { useState } from "react";
import { X, Upload, Image as ImageIcon, Check, RefreshCw, Sparkles, Link } from "lucide-react";

interface PhotoCustomizerModalProps {
  isOpen: boolean;
  currentImage: string;
  onClose: () => void;
  onSaveImage: (newImageUrl: string) => void;
}

export default function PhotoCustomizerModal({
  isOpen,
  currentImage,
  onClose,
  onSaveImage
}: PhotoCustomizerModalProps) {
  const [urlInput, setUrlInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  if (!isOpen) return null;

  const defaultPresets = [
    {
      name: "Soprano in Black/Navy Lace Gown by Window (Main Image)",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85",
      desc: "Editorial window portrait looking over city skyline in lace gown with drop earrings."
    },
    {
      name: "Stage Performance in Blue Gown",
      url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1920&q=85",
      desc: "Live stage performance at the opera house with dramatic stage lighting."
    },
    {
      name: "Studio Editorial Close-Up",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=85",
      desc: "Intimate studio headshot with dramatic lighting."
    },
    {
      name: "Concert Stage Recital",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=85",
      desc: "Symphony hall recital ambiance with warm gold lighting."
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setPreviewUrl(urlInput.trim());
    }
  };

  const handleSave = () => {
    onSaveImage(previewUrl);
    onClose();
  };

  const handleResetDefault = () => {
    setPreviewUrl(defaultPresets[0].url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2.5">
            <ImageIcon size={18} className="text-gold-accent" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Main Hero Image Customizer
              </h3>
              <p className="text-[11px] font-sans text-stone-400">
                Set the primary portrait for Sarah Lavery's website
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 rounded-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active Preview */}
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-gold-accent font-semibold block mb-2">
              Active Preview
            </span>
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-stone-800 bg-stone-950">
              <img
                src={previewUrl}
                alt="Selected Main Hero Preview"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs font-serif font-bold text-stone-200">
                  Sarah Lavery — Official Main Image
                </p>
              </div>
            </div>
          </div>

          {/* Option A: Upload Local Image File */}
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-sm">
            <span className="text-xs font-sans font-bold text-stone-200 block mb-1 flex items-center gap-2">
              <Upload size={14} className="text-gold-accent" />
              <span>Option 1: Upload Your Image File</span>
            </span>
            <p className="text-[11px] font-sans text-stone-400 mb-3">
              Upload the portrait image (e.g. the window portrait or high-res photo from your computer).
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-sans tracking-wider uppercase rounded-sm cursor-pointer transition-colors">
              <Upload size={13} />
              <span>Choose Image File...</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Option B: Enter Custom Image URL */}
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-sm">
            <span className="text-xs font-sans font-bold text-stone-200 block mb-1 flex items-center gap-2">
              <Link size={14} className="text-gold-accent" />
              <span>Option 2: Paste Image URL</span>
            </span>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 bg-stone-900 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-accent"
              />
              <button
                onClick={handleApplyUrl}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans font-semibold rounded-sm"
              >
                Apply URL
              </button>
            </div>
          </div>

          {/* Option C: Presets */}
          <div>
            <span className="text-xs font-sans font-bold text-stone-300 block mb-2">
              Option 3: Select from Curated Soprano Presets
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {defaultPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewUrl(preset.url)}
                  className={`p-3 text-left rounded-sm border transition-all flex items-center gap-3 ${
                    previewUrl === preset.url
                      ? "bg-stone-950 border-gold-accent shadow-md text-white"
                      : "bg-stone-950/60 hover:bg-stone-950 border-stone-800 text-stone-300"
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-12 h-12 rounded-sm object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <p className="font-serif text-xs font-bold truncate text-stone-100">
                      {preset.name}
                    </p>
                    <p className="text-[10px] font-sans text-stone-400 line-clamp-1 mt-0.5">
                      {preset.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <button
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <RefreshCw size={13} />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-stone-400 hover:text-stone-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-gold-accent hover:bg-[#d8b56f] text-stone-950 text-xs font-sans tracking-widest uppercase font-bold rounded-sm shadow-md flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Save as Main Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
