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
import { Loader, Languages, Facebook, Twitter, Instagram, Upload, FileImage } from 'lucide-react';
import MarketplaceHeader from '@/components/marketplace-header';
import Image from 'next/image';

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


export default function SellPage() {
  const [productName, setProductName] = useState('drawing');
  const [locationContext, setLocationContext] = useState('West Bengal');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>('Screenshot 2025-10-26 051318');
  const [generatedStory, setGeneratedStory] = useState('সোনার সুতোয় বোনা এক কাহিনী।\nএটা শুধু একটি শাড়ি নয়, এটি বেনারসের কারিগরদের প্রজন্মের পর প্রজন্মের শিল্পের প্রতীক। প্রতিটি সুতো ঐতিহ্যের গল্প বলে।');
  const [translatedStory, setTranslatedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      setFileName(file.name);
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
            language: 'bn', // Default to Bengali as per image
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
                        </div>
                    </div>

                    <div className="md:col-span-7">
                        <Card className="h-full">
                            <CardContent className="p-6">
                                <div className="relative w-full aspect-video rounded-lg bg-black mb-6">
                                     {photoPreview ? (
                                        <Image src={photoPreview} alt="Product Preview" fill objectFit="contain" className="rounded-lg" />
                                     ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center text-gray-500 p-4 bg-gray-800 rounded-md">
                                                <p className="font-semibold">The image you are requesting does not exist or is no longer available.</p>
                                                <p className="text-sm">imgur.com</p>
                                            </div>
                                        </div>
                                     )}
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Generate AI Story</h3>
                                    <div className="flex items-center gap-4">
                                        <Select defaultValue='bn' onValueChange={handleTranslate}>
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
                                        <p className="whitespace-pre-wrap">{translatedStory || generatedStory}</p>
                                     )}
                                </div>

                                <h3 className="text-lg font-semibold mb-4">Social Media Captions</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Instagram className="h-6 w-6 text-pink-700 mt-1"/>
                                        <div className="flex-grow">
                                            <p className="text-foreground">Elegance Woven in Gold. ✨ #BanarasiSaree #IndianWeaves #HandloomLove #SareeStyle #EthnicFashion</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start gap-4">
                                        <Facebook className="h-6 w-6 text-blue-600 mt-1"/>
                                        <div className="flex-grow">
                                            <p className="text-foreground">Timeless Tradition, Modern Grace. Discover the rich heritage of Banarasi silk. Perfect for weddings and festive occasions. #IndianTextiles #SilkSaree</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
