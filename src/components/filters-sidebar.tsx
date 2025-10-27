
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';

const regions = [
  "Andhra Pradesh", "Assam", "Bihar", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other Regions of India"
];
const materials = ["Wood Carvings", "Ceramic / Terracotta", "Brass & Metal", "Leather / Paper", "Pure Silk", "Wool / Cotton"];
const priceRanges = ["Under ₹500", "₹500 - ₹1500", "₹1500 - ₹3000", "Above ₹3000"];

export default function FiltersSidebar() {
  return (
    <div className="space-y-8">
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-primary">Smart Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['region']} className="w-full">
            <AccordionItem value="region">
              <AccordionTrigger className="font-semibold text-foreground">Region</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox id={region} />
                      <Label htmlFor={region} className="font-normal text-sm">{region}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="material">
              <AccordionTrigger className="font-semibold text-foreground">Material</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox id={material} />
                      <Label htmlFor={material} className="font-normal text-sm">{material}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="price">
              <AccordionTrigger className="font-semibold text-foreground">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {priceRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={range} />
                      <Label htmlFor={range} className="font-normal text-sm">{range}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <div className="bg-background p-6 rounded-lg border">
          <h4 className="font-semibold text-primary font-serif mb-2">Most Loved Crafts</h4>
          <p className="text-sm text-muted-foreground mb-4">Authentic Madhubani painting from Bihar, created using natural dyes and traditional techniques.</p>
          <div className="flex justify-between text-xs mb-4">
              <span className="text-muted-foreground">Est. Delivery: 5-7 days</span>
              <span className="font-semibold text-primary">Free Shipping</span>
          </div>
          <Button className="w-full">View Story</Button>
      </div>
    </div>
  );
}
