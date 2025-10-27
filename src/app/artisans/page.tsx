'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Sun, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import MarketplaceHeader from '@/components/marketplace-header';

const forumTopics = [
    { title: 'Best Pricing Strategy for Handloom Textiles', meta: 'tcssassn tasscnsc tawsown' },
    { title: 'Men tassescn te Hewo keyscnscald', meta: 'tcssassn tasscnsc tawsown' },
    { title: 'AI Tool Test for Product Photography', meta: 'tcssassn tasscnsc tawsown' },
    { title: 'Al tst tcsassn trtkcst hcwssol tktn', meta: 'tcssassn tasscnsc tawsown' }
];

const workshops = [
    'Aovernien ptwsnst tltttct',
    'Aiouw ptwosp bo 3p0a',
    'Use tkersd is rme Jiitze',
    'Was rod the citoi tcont olvbiattns',
    'Revrenne Chnvrd Bow'
];

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
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
            <Sun className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-serif font-bold text-gray-800">Artisan Community Hub</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Forum: Connect & Share</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {forumTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent">
                    <Avatar>
                        <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{topic.title}</p>
                      <p className="text-sm text-muted-foreground">{topic.meta}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-t-4 border-red-500">
              <CardHeader>
                <CardTitle className="text-red-600">Go Live to Your Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Connect with your followers, showcase your process, and sell your products in real-time.</p>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setIsModalOpen(true)}>
                  <Video className="mr-2 h-4 w-4" /> Start Live Stream
                </Button>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Workshops & Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Upcaicmde 26 25203</p>
                    <ul className="space-y-2 list-disc list-inside">
                        {workshops.map((event, index) => (
                            <li key={index} className="text-sm">{event}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
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
               <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                <Alert variant="destructive" className="m-4">
                    <Camera className="h-4 w-4"/>
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
             <Button size="lg" disabled={!hasCameraPermission} className="bg-red-600 hover:bg-red-700">
               Go Live Now
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
