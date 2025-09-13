import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  artefact: {
    id: string;
    name: string;
    description: string;
    image: string;
    rarity: "Legendary" | "Rare" | "Common";
    impact: string;
    realm: string;
    price: string | number;
  };
};

const ProductCard = ({ artefact }: ProductCardProps) => {
  return (
    <Card
      key={artefact.id}
      className="group relative bg-black/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Image section */}
      <div className="relative overflow-hidden">
        <Image
          src={artefact.image || "/placeholder.svg"}
          alt={artefact.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          width={400}
          height={300}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Badge */}
        <Badge
          className={`absolute top-4 right-4 ${
            artefact.rarity === "Legendary"
              ? "bg-primary text-primary-foreground"
              : artefact.rarity === "Rare"
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {artefact.rarity}
        </Badge>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-playfair text-xl font-bold text-primary mb-2 group-hover:rune-glow transition-all duration-300">
            {artefact.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {artefact.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary font-medium">
              {artefact.impact}
            </span>
            <span className="text-muted-foreground">{artefact.realm}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {artefact.price}
          </span>
          <div className="flex gap-3">
            <Button
              size="sm"
              className="!bg-yellow-500 !hover:bg-yellow-600 !text-black shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
            >
              Acquire
            </Button>
            {/* <Button
              size="sm"
              className="!bg-yellow-400 hover:bg-yellow-500 text-black shadow-md shadow-yellow-400/25 hover:shadow-yellow-500/40 transition-all duration-300"
            >
              Buy Now
            </Button> */}
          </div>
        </div>
      </CardContent>

      {/* Border animation */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-lg transition-all duration-500 pointer-events-none" />
    </Card>
  );
};

export default ProductCard;
