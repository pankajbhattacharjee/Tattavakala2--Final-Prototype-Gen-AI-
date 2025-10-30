
'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Video, Mic, Sun, User, Camera,Youtube, Loader, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import MarketplaceHeader from '@/components/marketplace-header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const discussions = [
    { title: 'Find the Right Price for Your Handmade Creations', description: 'Discuss how artisans can price their handcrafted products fairly staying in this competitive world.' },
    { title: 'Build an Digital Presence as an Artisan', description: 'Share tips, stories, and strategies on how you showcase your craft beautifully in the digital world.' },
    { title: 'Use AI Tools for Product Photography', description: 'Learn how modern tools can help capture your handmade pieces in the best light to enhance their authenticity.' },
    { title: 'Challenges in Traditional Craft Preservation', description: 'An open talk on how to keep cultural art forms alive in today’s fast-changing world.' },
];

const tutorials = [
    {
        title: "How to Create a Facebook Account",
        embedUrl: "https://www.youtube.com/embed/RU50X3y1SJ4"
    },
    {
        title: "How to Create an Instagram Account",
        embedUrl: "https://www.youtube.com/embed/XlLmBUdzFks"
    },
    {
        title: "How to Create a Google Business Profile",
        embedUrl: "https://youtube.com/shorts/BElTnAVTYq4?feature=share"
    }
];

const workshops = [
    { title: 'The Weaving Circle', description: 'Sit beside our artisans as they guide you how they work with the core of their heart.' },
    { title: 'Pottery & Peace', description: 'Get your hands messy with clay, shape your thoughts into art, explore a new version of yourself.' },
    { title: 'Colors of Nature', description: 'Discover how simple plants and roots transform plain fabric into something truly a magical one.' },
    { title: 'A Day with the Artisans', description: 'Listen to heartfelt stories from the makers themselves, how they started their journey.' },
    { title: 'Explore Future of Handcrafts', description: 'A heart-to-heart conversation with Artisans on keeping traditional art alive in this modern, tech based world.' },
];

function ArtisansContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterModalOpen(false);
    toast({
        title: 'Registration Successful!',
        description: 'Thank you for registering for the workshop.',
    })
  }

  return (
    <>
        <div className="flex items-center gap-4 mb-8">
            <Sun className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-serif font-bold text-gray-800">Artisan Community Hub</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Join the Tattvakala community in Google Chat!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {discussions.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                           <Avatar>
                                <AvatarFallback><User/></AvatarFallback>
                            </Avatar>
                           <div>
                             <h4 className="font-semibold">{event.title}</h4>
                             <p className="text-sm text-muted-foreground">{event.description}</p>
                           </div>
                        </div>
                    ))}
                     <Button asChild className="mt-4">
                      <a href="https://chat.google.com/room/AAQAnyA7u6g?cls=5" target="_blank" rel="noopener noreferrer">Join the Google Chat</a>
                     </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="text-primary"/>
                        Workshops & Events
                    </CardTitle>
                    <CardDescription>Upcoming: December 26, 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {workshops.map((workshop, index) => (
                        <div key={index} className="flex items-start gap-4">
                           <Avatar>
                                <AvatarFallback><Users/></AvatarFallback>
                            </Avatar>
                           <div>
                             <h4 className="font-semibold">{workshop.title}</h4>
                             <p className="text-sm text-muted-foreground">{workshop.description}</p>
                           </div>
                        </div>
                    ))}
                    <Button className="mt-4" onClick={() => setIsRegisterModalOpen(true)}>
                        Register Now
                    </Button>
                </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-t-4 border-red-500">
              <CardHeader>
                <CardTitle className="text-red-600">Go Live to Your Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Connect with your audience or consumer, showcase your process , and sell your product in real-time.</p>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setIsModalOpen(true)}>
                  <Video className="mr-2 h-4 w-4" /> Start Live Stream
                </Button>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Youtube className="text-red-500"/>
                        Tutorials & Resources
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Watch our tutorials to learn how to best showcase your products and reach a wider audience.</p>
                    <div className="grid grid-cols-1 gap-4">
                        {tutorials.map((tutorial) => (
                            <div key={tutorial.title}>
                                <h4 className="font-semibold mb-2 text-sm">{tutorial.title}</h4>
                                <div className="aspect-video rounded-lg overflow-hidden">
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        src={tutorial.embedUrl.replace("shorts/", "embed/").split('?')[0]}
                                        title={tutorial.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>

      {/* Live Stream Modal */}
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
      
      {/* Workshop Registration Modal */}
       <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register for Workshop</DialogTitle>
            <DialogDescription>
              Fill in your details to reserve your spot.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegisterSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                 <Button type="submit">Submit Registration</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

function PageWithHeaderAndSuspense() {
  return (
     <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader className="animate-spin h-8 w-8" /></div>}>
      <MarketplaceHeader />
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
          <ArtisansContent />
      </div>
    </Suspense>
  );
}

export default function ArtisansPage() {
  const searchParams = useSearchParams();
  return (
    <div className="bg-background min-h-screen">
      <Suspense>
        <PageWithHeaderAndSuspense />
      </Suspense>
    </div>
  );
}
