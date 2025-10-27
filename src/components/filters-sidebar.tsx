import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const regions = [
  "Andhra Pradesh", "Assam", "Bihar", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other Regions of India"
];

const materials = ["Cotton", "Silk", "Wood", "Clay", "Metal"];

export default function FiltersSidebar() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Smart Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['region']} className="w-full">
          <AccordionItem value="region">
            <AccordionTrigger className="font-semibold">Region</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {regions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox id={region} />
                    <Label htmlFor={region} className="font-normal">{region}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="material">
            <AccordionTrigger className="font-semibold">Material</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {materials.map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox id={material} />
                    <Label htmlFor={material} className="font-normal">{material}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
