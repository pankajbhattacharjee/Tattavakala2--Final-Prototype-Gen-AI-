
'use client';
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateProductStory, translateProductStory, speechToText } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Loader, Languages, Facebook, Instagram, Upload, FileImage, Mic, Link as LinkIcon, Store, Share2, Bot, Send } from 'lucide-react';
import MarketplaceHeader from '@/components/marketplace-header';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/categories';

const regions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry"
];

const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'te', label: 'Telugu' },
];

type SocialCaption = {
    platform: 'instagram' | 'facebook';
    caption: string;
    hashtags: string;
};

function SellContent() {
  const [productName, setProductName] = useState('');
  const [artisanName, setArtisanName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [locationContext, setLocationContext] = useState('');
  const [category, setCategory] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState('');
  const [socialCaptions, setSocialCaptions] = useState<SocialCaption[]>([]);
  const [translatedStory, setTranslatedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const router = useRouter();


  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        setUserDescription(prev => prev + event.results[i][0].transcript + '. ');
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
            };

            recognition.onerror = (event: any) => {
                if (event.error !== 'not-allowed') {
                    toast({
                        variant: 'destructive',
                        title: 'Voice Recognition Error',
                        description: `An error occurred: ${event.error}`,
                    });
                }
                setIsListening(false);
            };
            
            recognition.onend = () => {
                setIsListening(false);
            };

        }
      }
    }, [toast]);
    
    const handleListen = () => {
        if (!recognitionRef.current) {
             toast({
                variant: 'destructive',
                title: 'Browser Not Supported',
                description: 'Voice recognition is not supported in this browser.',
            });
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                toast({ title: 'Listening...', description: 'Start speaking to add context.' });
            } catch (e) {
                 toast({
                    variant: 'destructive',
                    title: 'Could not start listening',
                    description: 'Please ensure microphone permissions are enabled.',
                });
                setIsListening(false);
            }
        }
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      setFileName(file.name);
      
      // Reset generated content when a new file is chosen
      setGeneratedStory('');
      setTranslatedStory('');
      setSocialCaptions([]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  const handleGenerateStory = async () => {
    if (!photo || !productName || !locationContext) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please upload a photo, enter a product name, and select a region.',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedStory('');
    setTranslatedStory('');
    setSocialCaptions([]);

    try {
        const photoDataUri = await fileToDataUri(photo);
        const result = await generateProductStory({
            photoDataUri,
            productName,
            locationContext,
            language: 'en', // Always generate in English first
        });
        setGeneratedStory(result.story);
        setSocialCaptions(result.captions);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'AI Story Generation Failed',
        description: 'Could not generate a story. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTranslate = async (language: string) => {
    if (!generatedStory) return;
    setIsTranslating(true);
    try {
        const result = await translateProductStory({
            story: generatedStory,
            language,
        });
        setTranslatedStory(result.translatedStory);
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Translation Failed",
            description: "Could not translate the story. Please try again."
        });
    } finally {
        setIsTranslating(false);
    }
  }

  const handlePublish = () => {
    if (!photoPreview || !productName || !generatedStory || !artisanName || !price || !category) {
        toast({
            variant: 'destructive',
            title: 'Cannot Publish',
            description: 'Please ensure you have a product name, artisan name, price, category, photo, and generated story before publishing.',
        });
        return;
    }

    try {
        const newProduct = {
            id: `prod_${Date.now()}`,
            name: productName,
            artisanName: artisanName,
            description: generatedStory,
            category: category,
            region: locationContext,
            price: price,
            type: category, // Using category for the 'type' field to align with filtering
            image: {
                src: photoPreview,
                hint: productName.toLowerCase(),
            },
        };

        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = [...existingProducts, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        toast({
            title: 'Product Published!',
            description: `${productName} is now live on the marketplace.`,
        });

        // Redirect to marketplace to see the new product
        router.push('/marketplace');

    } catch (error) {
        console.error('Failed to save product to localStorage', error);
        toast({
            variant: 'destructive',
            title: 'Publishing Failed',
            description: 'There was an error saving your product.',
        });
    }
  };
  
  const getShareableContent = () => {
    const caption = socialCaptions.find(c => c.platform === 'facebook')?.caption || generatedStory;
    return `${caption} ${socialCaptions.find(c => c.platform === 'facebook')?.hashtags || ''}`;
  }

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'pinterest') => {
      const shareUrl = window.location.origin + '/marketplace'; // A generic link to the marketplace
      const shareText = encodeURIComponent(getShareableContent());
      const shareImage = encodeURIComponent(photoPreview || '');

      let url = '';
      switch(platform) {
          case 'facebook':
              url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${shareText}`;
              break;
          case 'twitter':
              url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`;
              break;
          case 'pinterest':
              if(photoPreview) {
                url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${shareImage}&description=${shareText}`;
              } else {
                 toast({variant: 'destructive', title: 'No Image', description: 'Please upload an image to share on Pinterest.'});
                 return;
              }
              break;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
  }

  const handleCopyLink = () => {
      const link = window.location.origin + '/marketplace';
      navigator.clipboard.writeText(link).then(() => {
          toast({title: 'Link Copied!', description: 'Marketplace URL copied to clipboard.'});
      });
  }


  return (
    <>
       <div className="bg-secondary/50 border-b">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
             <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Bot className="h-6 w-6"/>
             </div>
             <div>
                <h2 className="font-semibold text-foreground">Meet Your AI Assistant</h2>
                <p className="text-sm text-muted-foreground">I'm here to help you craft the perfect story for your product. Just upload a photo and provide some details to get started.</p>
             </div>
         </div>
       </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-5">
                        <div className="space-y-6">
                            <Card 
                                className="border-dashed border-2 text-center p-6 cursor-pointer hover:bg-accent"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="mx-auto h-12 w-12 text-pink-500" />
                                <h3 className="mt-4 text-lg font-medium text-foreground">Upload to Marketplace</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Click here to upload product photos or videos.</p>
                                <Button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white w-full sm:w-auto">Upload Files</Button>
                                <Input id="product-photo" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            </Card>

                            {fileName && (
                                <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                                    <FileImage className="h-6 w-6 text-muted-foreground"/>
                                    <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="product-name" className="text-base">Product Name</Label>
                                <Input id="product-name" placeholder="e.g., Woven Banarasi Saree" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="artisan-name" className="text-base">Artisan Name</Label>
                                <Input id="artisan-name" placeholder="e.g., Ramesh Kumar" value={artisanName} onChange={(e) => setArtisanName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-base">Price (₹)</Label>
                                <Input id="price" type="number" placeholder="e.g., 2499" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-base">Category/Material</Label>
                                <Select onValueChange={setCategory} value={category}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select Category/Material" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-base">Location Context (State/Region)</Label>
                                <Select onValueChange={setLocationContext} value={locationContext}>
                                    <SelectTrigger id="location">
                                        <SelectValue placeholder="Select State/Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Tell Your Story</CardTitle>
                                    <CardDescription className="text-sm">Alternatively, describe your product in your own words.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea 
                                        placeholder="Describe the history, process, or what makes your product special..." 
                                        className="mb-4" 
                                        value={userDescription}
                                        onChange={(e) => setUserDescription(e.target.value)}
                                    />
                                    <Button variant="outline" className="w-full" onClick={handleListen}>
                                        <Mic className={`mr-2 h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : ''}`}/>
                                        {isListening ? 'Stop Listening' : 'Add Context with Voice'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="md:col-span-7">
                        <Card className="h-full">
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="relative w-full aspect-video rounded-lg bg-black mb-6">
                                     {photoPreview ? (
                                        <Image src={photoPreview} alt="Product Preview" fill objectFit="contain" className="rounded-lg" />
                                     ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <p>Upload a photo to see a preview</p>
                                        </div>
                                     )}
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Generate AI Story</h3>
                                    <div className="flex items-center gap-4">
                                        <Select defaultValue='en' onValueChange={handleTranslate} disabled={!generatedStory}>
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map(lang => <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Button variant="link" className="text-pink-500 p-0 h-auto" onClick={handleGenerateStory} disabled={isLoading}>
                                            {isLoading ? <Loader className="animate-spin" /> : 'Generate'}
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="bg-secondary rounded-lg p-4 min-h-[120px] text-muted-foreground mb-6">
                                     {isLoading ? (
                                        <div className="flex items-center justify-center h-full"><Loader className="animate-spin text-primary"/></div>
                                     ) : (
                                        <p className="whitespace-pre-wrap">{isTranslating ? <Loader className="animate-spin" /> : (translatedStory || generatedStory || 'Your generated story will appear here...')}</p>
                                     )}
                                </div>

                                <h3 className="text-lg font-semibold mb-4">Social Media Captions</h3>
                                <div className="space-y-4 flex-grow">
                                     {isLoading ? (
                                         <div className="flex items-center justify-center h-full text-muted-foreground"><Loader className="animate-spin text-primary"/></div>
                                     ) : socialCaptions.length > 0 ? (
                                        socialCaptions.map((caption, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                {caption.platform === 'instagram' && <Instagram className="h-6 w-6 text-pink-700 mt-1"/>}
                                                {caption.platform === 'facebook' && <Facebook className="h-6 w-6 text-blue-600 mt-1"/>}
                                                <div className="flex-grow">
                                                    <p className="text-foreground">{caption.caption} <span className="text-blue-800">{caption.hashtags}</span></p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-secondary rounded-lg text-muted-foreground">
                                            {generatedStory ? <p>No captions generated.</p> : <p>AI-generated captions will appear here.</p>}
                                        </div>
                                    )}
                                </div>
                                 <div className="flex justify-end mt-4 gap-2">
                                     <Button variant="outline" onClick={() => setIsShareModalOpen(true)} disabled={!generatedStory}>
                                        <Share2 className="mr-2 h-4 w-4"/>
                                        Share
                                    </Button>
                                    <Button onClick={handlePublish} disabled={!generatedStory}>
                                        <Send className="mr-2 h-4 w-4" />
                                        Publish to Marketplace
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
      </div>
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Share AI Generated Content</DialogTitle>
                <DialogDescription>Choose a platform to share this generated content.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={() => handleSocialShare('pinterest')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 fill-current">
                        <title>Pinterest</title>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.027-.655 2.56-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.159-1.492-.695-2.433-2.878-2.433-4.646 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    <span className="text-sm">Pinterest</span>
                </div>
                 <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={handleCopyLink}>
                    <LinkIcon className="h-8 w-8"/>
                    <span className="text-sm">Copy Link</span>
                </div>
            </div>
             <Button onClick={() => setIsShareModalOpen(false)} className="w-full">Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}


export default function SellPage() {
  return (
    <div className="bg-background min-h-screen">
      <Suspense fallback={<div><div className="h-20"></div><div className="flex justify-center items-center h-64"><Loader className="animate-spin h-8 w-8" /></div></div>}>
        <MarketplaceHeader />
        <SellContent />
      </Suspense>
    </div>
  );
}
