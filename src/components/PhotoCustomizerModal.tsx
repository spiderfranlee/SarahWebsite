import React, { useState } from "react";
import { X, Upload, Image as ImageIcon, Check, RefreshCw, Link } from "lucide-react";

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
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
          setUrlError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = () => {
    const cleanUrl = urlInput.trim();
    if (!cleanUrl) return;

    if (cleanUrl.startsWith("blob:")) {
      setUrlError(
        "Blob URLs (e.g. blob:https://dash.cloudflare.com/...) only exist temporarily inside that specific browser tab and cannot be loaded externally. Please upload the photo file directly using the 'Upload Photo from Device' button or drag & drop it here."
      );
      return;
    }

    setUrlError(null);
    setPreviewUrl(cleanUrl);
  };

  const handleSave = () => {
    onSaveImage(previewUrl);
    onClose();
  };

  const handleResetDefault = () => {
    setPreviewUrl(defaultPresets[0].url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-stone-200 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <ImageIcon size={18} className="text-rose-700" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Hero Image Customizer
              </h3>
              <p className="text-[11px] font-sans text-stone-500">
                Set the primary portrait for Sarah Lavery's website
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active Preview */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-stone-700 font-bold mb-2">
              Current Preview:
            </label>
            <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
              <img
                src={previewUrl}
                alt="Selected Preview"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Upload Custom File */}
          <div className="space-y-2">
            <label className="block text-xs font-sans uppercase tracking-wider text-stone-700 font-bold">
              1. Upload Photo from Device / Drag & Drop
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed rounded-lg transition-colors text-center ${
                isDragging
                  ? "bg-rose-50 border-rose-500 text-rose-800"
                  : "bg-[#FAF8F5] border-stone-300 hover:border-rose-400 text-stone-700"
              }`}
            >
              <Upload size={20} className={isDragging ? "text-rose-600 animate-bounce" : "text-rose-700"} />
              <div className="space-y-1">
                <p className="text-xs font-sans font-semibold text-stone-800">
                  Drag and drop your portrait here, or{" "}
                  <label className="text-rose-700 hover:text-rose-900 underline font-bold cursor-pointer">
                    browse files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-[11px] font-sans text-stone-500">
                  Supports JPG, PNG, WEBP, and high-res camera portraits
                </p>
              </div>
            </div>
          </div>

          {/* Paste Image URL */}
          <div className="space-y-2">
            <label className="block text-xs font-sans uppercase tracking-wider text-stone-700 font-bold">
              2. Or Enter Direct Image Web URL (Public HTTPS)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (urlError) setUrlError(null);
                }}
                placeholder="https://imagedelivery.net/... or https://example.com/portrait.jpg"
                className="flex-1 px-3.5 py-2 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 focus:outline-none focus:border-rose-600 shadow-2xs"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-sans font-bold uppercase rounded border border-stone-300 transition cursor-pointer shrink-0"
              >
                Apply URL
              </button>
            </div>
            {urlError && (
              <p className="text-[11px] font-sans text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded leading-relaxed">
                {urlError}
              </p>
            )}
          </div>

          {/* Presets Grid */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <label className="block text-xs font-sans uppercase tracking-wider text-stone-700 font-bold mb-2">
              3. Or Pick from Curated Classical Portraits
            </label>
            <div className="grid grid-cols-2 gap-3">
              {defaultPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewUrl(preset.url)}
                  className={`p-2.5 text-left border rounded-md transition-all flex flex-col gap-2 cursor-pointer ${
                    previewUrl === preset.url
                      ? "bg-rose-50 border-rose-400 ring-1 ring-rose-300"
                      : "bg-[#FAF8F5] border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="aspect-[16/9] w-full rounded overflow-hidden bg-stone-200">
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[11px] font-sans font-bold text-stone-800 line-clamp-1">
                    {preset.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-stone-200 bg-[#FAF8F5]">
          <button
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-900 text-xs font-sans font-semibold cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Reset Default</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-sans font-semibold rounded transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans font-bold uppercase rounded shadow-sm transition cursor-pointer"
            >
              <Check size={14} />
              <span>Apply to Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
