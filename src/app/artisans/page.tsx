
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import MarketplaceHeader from '@/components/marketplace-header';

export default function ArtisansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isModalOpen) {
      const getCameraPermission = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera and microphone permissions in your browser settings.',
          });
        }
      };

      getCameraPermission();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if(videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [isModalOpen, toast]);

  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Artisans Community</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsModalOpen(true)}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Video className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Go Live</CardTitle>
                  <CardDescription>Start a live stream to showcase your craft.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                 <Camera className="w-16 h-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          {/* Other community cards can go here */}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Live Stream Setup</DialogTitle>
            <DialogDescription>
              Check your camera and microphone before going live.
            </DialogDescription>
          </DialogHeader>
          <div className="relative mt-4">
            <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted />
            {!hasCameraPermission && (
               <div className="absolute inset-0 flex items-center justify-center">
                <Alert variant="destructive" className="m-4">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera and microphone access to use this feature.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
             <div className="flex items-center gap-4">
                <Button variant="outline"><Mic className="mr-2"/> Mute</Button>
                <Button variant="outline"><Video className="mr-2"/> Stop Video</Button>
             </div>
             <Button size="lg" disabled={!hasCameraPermission}>
               Go Live Now
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
