"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { artefacts } from "@/data/products";
import ProductCard from "@/components/custom/ProductCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RealmType = "daily" | "rare" | "secret";

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const [tab, setTab] = useState("products");
  const [selectedRealm, setSelectedRealm] = useState<RealmType>("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();
  // --- Derived Data
  const filteredArtefacts = artefacts[selectedRealm].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArtefacts.length / ITEMS_PER_PAGE);
  const displayedItems = filteredArtefacts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen w-full bg-black text-white py-16 px-6">
      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-display font-extrabold text-yellow-400 mb-2 drop-shadow-lg">
          Explore the Artefacts
        </h1>
        <p className="text-gray-300 text-lg">
          Discover mystical items and eco-boxes from the Secret Verse.
        </p>
      </motion.div>

      {/* --- Tabs --- */}
      <Tabs value={tab} onValueChange={setTab} className="max-w-6xl mx-auto">
        <TabsList className="grid grid-cols-2 bg-black/50 border border-yellow-400/30 rounded-2xl mb-10">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400 font-semibold"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="boxes"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400 font-semibold"
          >
            Boxes
          </TabsTrigger>
        </TabsList>

        {/* --- Products Tab --- */}
        <TabsContent value="products">
          {/* --- Filter Section --- */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex gap-3 flex-wrap">
              <Select
                value={selectedRealm}
                onValueChange={(v) => {
                  setSelectedRealm(v as RealmType);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-40 bg-black/60 border-yellow-400/30 text-yellow-400">
                  <SelectValue placeholder="Select Realm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="secret">Secret</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Search artefacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-56 bg-black/60 border-yellow-400/30 text-yellow-300 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* --- Product Grid --- */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedItems.map((artefact) => (
              <ProductCard
                key={artefact.id}
                artefact={{
                  ...artefact,
                  id: artefact.id.toString(),
                  rarity: artefact.rarity as "Common" | "Rare" | "Legendary",
                }}
              />
            ))}
          </motion.div>

          {/* --- Pagination --- */}
          {totalPages > 1 && (
            <Pagination className="mt-12 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="text-yellow-400 hover:text-yellow-500"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setPage(i + 1)}
                      isActive={page === i + 1}
                      className={`${
                        page === i + 1
                          ? "bg-yellow-400 text-black"
                          : "text-yellow-400"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className="text-yellow-400 hover:text-yellow-500"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>

        {/* --- Boxes Tab --- */}
        <TabsContent value="boxes">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { name: "Mystic Box", price: 49, image: "/box1.jpg" },
              { name: "Golden Relic Box", price: 99, image: "/box2.jpg" },
              { name: "Secret Verse Chest", price: 149, image: "/box3.jpg" },
            ].map((box, idx) => (
              <Card
                key={idx}
                className="bg-black/60 border border-yellow-400/30 text-center rounded-3xl hover:scale-105 transition-transform"
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <Image
                    src={box.image}
                    alt={box.name}
                    width={300}
                    height={300}
                    className="rounded-2xl mb-4 object-cover"
                  />
                  <h3 className="text-xl font-display text-yellow-400 mb-2">
                    {box.name}
                  </h3>
                  <p className="text-gray-300 mb-4">${box.price}</p>
                  <Button
                    onClick={() =>
                      router.push(
                        `/boxes/${box.name.toLowerCase().replace(/\s+/g, "-")}`
                      )
                    }
                    className="bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};


