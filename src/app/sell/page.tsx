'use client';
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateProductStory, translateProductStory } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Loader, Languages, Facebook, Twitter, Instagram } from 'lucide-react';
import MarketplaceHeader from '@/components/marketplace-header';

const regions = [
  "Andhra Pradesh", "Assam", "Bihar", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'te', label: 'Telugu' },
];

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.017 10.938c.31-.623.49-1.312.49-2.042 0-2.29-1.48-4.81-4.036-4.81-3.37 0-4.964 2.754-4.964 5.92 0 2.375 1.25 3.99 3.163 3.99.96 0 1.68-.99 1.68-1.996 0-.866-.39-1.636-.88-2.12-.34-.33-.56-.41-.45-.66.12-.29.38-.61.53-.88.23-.42.6-.82.6-1.22 0-.63-.45-1.12-.9-1.12-.87 0-1.65.94-1.65 2.52 0 .83.25 1.68.25 1.68s-1.2 5.09-1.42 6.02c-.22 1.05.47 1.95 1.42 1.95 1.65 0 2.82-2.4 2.82-4.56 0-1.78-1.14-3.15-2.6-3.15-.98 0-1.75.82-1.75 1.75 0 .57.2.98.48 1.22.03.02.05.05.05.05s-.62 2.54-.72 2.94c-.12.42-.1.75-.05 1.01.07.38.28.63.53.63 1.13 0 1.9-2.32 2.3-3.9.3-1.17.47-2.32.47-2.32s.43.14.53.18c1.7.7 2.3 2.52 2.3 4.32 0 3.15-2.2 5.6-5.85 5.6-3.97 0-6.84-2.9-6.84-6.33 0-3.23 2.33-5.65 5.4-5.65 2.2 0 3.48 1.1 3.48 2.62 0 1-.43 2.1-.63 2.7Z" />
    </svg>
);


export default function SellPage() {
  const [productName, setProductName] = useState('');
  const [locationContext, setLocationContext] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState('');
  const [translatedStory, setTranslatedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
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

    try {
        const photoDataUri = await fileToDataUri(photo);
        const result = await generateProductStory({
            photoDataUri,
            productName,
            locationContext,
            language: 'en',
        });
        setGeneratedStory(result.story);
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


  return (
     <div className="bg-background min-h-screen">
      <MarketplaceHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
                 <h1 className="text-3xl font-bold mb-2">Sell With Us</h1>
                 <p className="text-muted-foreground mb-6">Let our AI help you craft the perfect story for your product.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>Enter the details for your handcrafted item.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="product-photo">Product Photo</Label>
                                <Input id="product-photo" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Upload File</Button>
                                {photoPreview && <div className="mt-4"><img src={photoPreview} alt="Product Preview" className="rounded-md object-cover w-full aspect-square" /></div>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product-name">Product Name</Label>
                                <Input id="product-name" placeholder="e.g., Woven Banarasi Saree" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location Context (State/Region)</Label>
                                <Select onValueChange={setLocationContext} value={locationContext}>
                                    <SelectTrigger id="location">
                                        <SelectValue placeholder="Select State/Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <Button onClick={handleGenerateStory} disabled={isLoading} className="w-full">
                                {isLoading ? <Loader className="animate-spin mr-2" /> : null}
                                Generate AI Story
                            </Button>
                        </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                             <CardHeader>
                                <CardTitle>Generated AI Story</CardTitle>
                                <CardDescription>Use this story for your product listing and social media.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading && <div className="flex items-center justify-center p-8"><Loader className="animate-spin text-primary" size={40}/></div>}
                                
                                {generatedStory && (
                                    <div className="space-y-6">
                                        <Textarea value={generatedStory} readOnly rows={8} className="bg-muted"/>
                                        
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold flex items-center gap-2"><Languages size={18}/> Translate</h3>
                                                {isTranslating && <Loader className="animate-spin" size={16}/>}
                                            </div>
                                            <div className="flex gap-2">
                                                {languages.map(lang => (
                                                    <Button key={lang.value} variant="outline" size="sm" onClick={() => handleTranslate(lang.value)} disabled={isTranslating}>
                                                        {lang.label}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        {translatedStory && (
                                             <Textarea value={translatedStory} readOnly rows={8} />
                                        )}

                                        <div className="space-y-2">
                                            <h3 className="font-semibold">Share on Social Media</h3>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon"><Twitter /></Button>
                                                <Button variant="outline" size="icon"><Facebook/></Button>
                                                <Button variant="outline" size="icon"><PinterestIcon className="h-4 w-4" /></Button>
                                                <Button variant="outline" size="icon"><Instagram/></Button>
                                            </div>
                                        </div>

                                    </div>
                                )}
                                {!generatedStory && !isLoading && <p className="text-muted-foreground text-center py-8">Your generated story will appear here.</p>}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
