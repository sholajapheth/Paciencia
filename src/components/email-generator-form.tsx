
'use client';

import { useState } from 'react';
import {
  generateEmailContent,
  type GenerateEmailContentInput,
  type GenerateEmailContentOutput,
} from '@/ai/flows/generate-email-content';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Copy } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function EmailGeneratorForm() {
  const [formData, setFormData] = useState<GenerateEmailContentInput>({
    fashionTrends: 'Minimalism, sustainable fabrics, neutral color palettes',
    customerPreferences: 'High-quality craftsmanship, timeless design, versatility',
    productName: 'The "Artisan" Crossbody Bag',
    brandVoice: 'Elegant, sophisticated, and modern',
  });
  const [result, setResult] = useState<GenerateEmailContentOutput | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, brandVoice: value }));
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${fieldName} has been copied.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setResult(null);

    try {
      const output = await generateEmailContent(formData);
      setResult(output);
      setStatus('success');
    } catch (error) {
      console.error('Error generating email content:', error);
      setStatus('error');
      toast({
        title: 'Generation Failed',
        description:
          'Could not generate email content. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Email Parameters</CardTitle>
            <CardDescription>
              Provide the details for the AI to generate content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g., The "Artisan" Crossbody Bag"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandVoice">Brand Voice</Label>
              <Select
                name="brandVoice"
                value={formData.brandVoice}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="brandVoice">
                  <SelectValue placeholder="Select a brand voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elegant, sophisticated, and modern">
                    Elegant & Modern
                  </SelectItem>
                  <SelectItem value="Playful, witty, and bold">
                    Playful & Bold
                  </SelectItem>
                  <SelectItem value="Minimalist, clean, and direct">
                    Minimalist & Direct
                  </SelectItem>
                  <SelectItem value="Luxurious, exclusive, and aspirational">
                    Luxurious & Aspirational
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fashionTrends">Fashion Trends</Label>
              <Textarea
                id="fashionTrends"
                name="fashionTrends"
                value={formData.fashionTrends}
                onChange={handleInputChange}
                placeholder="e.g., Minimalism, sustainable fabrics"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPreferences">Customer Preferences</Label>
              <Textarea
                id="customerPreferences"
                name="customerPreferences"
                value={formData.customerPreferences}
                onChange={handleInputChange}
                placeholder="e.g., High-quality, timeless design"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={status === 'loading'}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {status === 'loading' ? 'Generating...' : 'Generate Content'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-8">
        {status === 'loading' && <LoadingSkeleton />}
        {status === 'error' && (
          <Card className="flex flex-col items-center justify-center text-center h-full">
            <CardHeader>
              <CardTitle>Generation Failed</CardTitle>
              <CardDescription>
                Something went wrong. Please check your connection or try again.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        {(status === 'idle' || (status === 'success' && !result)) && (
          <Card className="flex flex-col items-center justify-center text-center h-full border-dashed">
            <CardHeader>
              <Wand2 className="h-12 w-12 mx-auto text-muted-foreground" />
              <CardTitle className="mt-4">Generated Content</CardTitle>
              <CardDescription>
                Your AI-generated email content will appear here.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        {status === 'success' && result && (
          <>
            <Card className="relative group">
              <CardHeader>
                <CardTitle>Subject Line</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{result.subjectLine}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(result.subjectLine, 'Subject line')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="relative group">
              <CardHeader>
                <CardTitle>Email Body</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: result.emailBody }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(result.emailBody, 'Email body')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </CardContent>
      </Card>
    </>
  );
}
