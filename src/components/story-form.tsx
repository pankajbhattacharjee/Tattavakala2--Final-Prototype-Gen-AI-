"use client";

import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateStoryAction } from "@/app/actions";
import { languages, StoryFormSchema, type StoryFormValues } from "@/lib/types";
import type { StoryState } from "./crafting-tale-app";

type StoryFormProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setStoryState: Dispatch<SetStateAction<StoryState | null>>;
};

// Helper function to read file as Base64
const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function StoryForm({
  setIsLoading,
  setError,
  setStoryState,
}: StoryFormProps) {
  const { toast } = useToast();

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    defaultValues: {
      productName: "",
      locationContext: "",
      language: "en",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: StoryFormValues) {
    setIsLoading(true);
    setError(null);
    setStoryState(null);

    const imageFile = values.image[0];
    const imagePreview = URL.createObjectURL(imageFile);

    try {
      const photoDataUri = await fileToDataUri(imageFile);
      const result = await generateStoryAction({
        productName: values.productName,
        locationContext: values.locationContext,
        language: values.language,
        photoDataUri,
      });

      if ("error" in result) {
        throw new Error(result.error);
      }

      setStoryState({
        story: result.story,
        productName: values.productName,
        imagePreview,
      });

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Tell Your Product's Story</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Sunrise' Ceramic Mug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationContext"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Context</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Made in Vermont, USA" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where is your product made? (State/Region)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Product Photo</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageUp className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP up to 5MB</p>
                            </div>
                            <Input 
                                id="dropzone-file" 
                                type="file"
                                {...rest}
                                className="hidden" 
                                accept="image/png, image/jpeg, image/gif, image/webp"
                                onChange={(e) => onChange(e.target.files)}
                            />
                        </label>
                    </div> 
                  </FormControl>
                   {value?.[0] && <FormDescription>Selected file: {value[0].name}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Generate Story
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
