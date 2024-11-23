import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera, Upload } from "lucide-react";

interface ReceiptUploaderProps {
  onUpload: (file: File) => void;
}

const ReceiptUploader = ({ onUpload }: ReceiptUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Notify parent component
    onUpload(file);
    
    // Show success message
    toast.success('Receipt uploaded successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Receipt
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            // TODO: Implement camera capture
            toast.info('Camera capture coming soon');
          }}
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {previewUrl && (
        <div className="mt-4">
          <div className="font-medium mb-2">Receipt Preview:</div>
          <div 
            ref={cropperRef}
            className="relative border rounded-lg overflow-hidden"
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          >
            <img
              src={previewUrl}
              alt="Receipt preview"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptUploader;