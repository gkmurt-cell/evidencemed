import { Info } from "lucide-react";

const AffiliateDisclosure = () => {
  return (
    <div className="bg-secondary/50 border-t border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Affiliate Disclosure:</strong> To help pay for this site's service, we display links to subscriptions, products, and services, thereby receiving commissions from such. Although there are some products we produce ourselves, which are found on the shop page, we endeavour to keep products relevant to your search enquiry. Our pages are not full of products with no substantiated medical evidence, but a resource library of products and treatments that are.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDisclosure;
