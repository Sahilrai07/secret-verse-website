"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { artefacts } from "@/data/products";
import ProductCard from "@/components/custom/ProductCard";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trees, Recycle, Globe, ArrowLeft } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const artefact =
    Object.values(artefacts)
      .flat()
      .find((a) => a.id.toString() === id?.toString()) || null;

  // 3D hover motion values (same as before)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Purchase modal state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

  // Form state (fake)
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [agree, setAgree] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  if (!artefact) {
    return (
      <div className="flex h-screen items-center justify-center text-yellow-400 text-xl font-semibold">
        Artefact not found.
      </div>
    );
  }

  const openModal = () => {
    setOpen(true);
    setStep("form");
  };

  const closeModal = () => {
    setOpen(false);
    // clear form optionally
  };

  const simulatePayment = () => {
    // basic validation for UX
    if (!name || !card || !expiry || !cvv || !agree) {
      alert(
        "Please fill all fields and agree to the terms (this is a fake payment). "
      );
      return;
    }

    setStep("processing");

    // simulate network / payment processing
    setTimeout(() => {
      // fake tx id
      const id = `SV-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
      setTxId(id);
      setStep("success");

      // optionally auto-close after a delay
      setTimeout(closeModal, 2500);
    }, 1800);
  };

  return (
    <>
      <Head>
        <title>{artefact.name} | The Secret Verse</title>
        <meta name="description" content={artefact.description} />
        <meta property="og:title" content={artefact.name} />
        <meta property="og:description" content={artefact.description} />
        <meta property="og:image" content={artefact.image} />
        <meta property="og:type" content="product" />
      </Head>

      <div className="min-h-screen w-full bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full lg:w-1/2 flex justify-center items-center perspective-1000"
          >
            {/* Image with glow */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full lg:w-1/2 flex justify-center items-center"
            >
              <Image
                src={artefact.image || "/placeholder.jpg"}
                alt={artefact.name}
                width={500}
                height={500}
                className="rounded-3xl object-cover shadow-[0_0_40px_15px_rgba(253,224,71,0.4)]"
              />
              <div className="absolute inset-0 rounded-3xl blur-3xl bg-yellow-400/20"></div>
            </motion.div>
            <div className="absolute inset-0 rounded-3xl blur-3xl bg-yellow-400/20"></div>
          </motion.div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
              {artefact.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <Badge
                className={`px-3 py-1 text-sm ${
                  artefact.rarity === "Legendary"
                    ? "bg-yellow-400 text-black"
                    : artefact.rarity === "Rare"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {artefact.rarity}
              </Badge>

              <p className="text-lg text-gray-300">₹{artefact.price}</p>
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {artefact.description}
            </p>

            {/* Trigger Dialog (Purchase) */}
            {/* Purchase Button + Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openModal}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl mt-4"
                >
                  Purchase
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-md bg-gradient-to-b from-black via-zinc-900 to-black border border-yellow-400/40 text-white shadow-[0_0_60px_rgba(253,224,71,0.3)] rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]">
                    Checkout — {artefact.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    This is a simulated purchase — no real payment will be
                    processed.
                  </DialogDescription>
                </DialogHeader>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-4"
                >
                  {step === "form" && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label className="text-yellow-400">
                          Cardholder Name
                        </Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="bg-zinc-900 border-yellow-400/30 focus:border-yellow-400 focus:ring-yellow-400/40"
                        />
                      </div>

                      <div>
                        <Label className="text-yellow-400">Card Number</Label>
                        <Input
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="bg-zinc-900 border-yellow-400/30 focus:border-yellow-400 focus:ring-yellow-400/40"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1">
                          <Label className="text-yellow-400">Expiry</Label>
                          <Input
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="bg-zinc-900 border-yellow-400/30 focus:border-yellow-400 focus:ring-yellow-400/40"
                          />
                        </div>
                        <div className="w-28">
                          <Label className="text-yellow-400">CVV</Label>
                          <Input
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            className="bg-zinc-900 border-yellow-400/30 focus:border-yellow-400 focus:ring-yellow-400/40"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm mt-3">
                        <input
                          id="agree"
                          type="checkbox"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          className="accent-yellow-400"
                        />
                        <label htmlFor="agree" className="text-gray-300">
                          I understand this is a fake payment for demo purposes.
                        </label>
                      </div>

                      <div className="pt-6 flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-yellow-400"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={simulatePayment}
                          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl"
                        >
                          Pay ₹{artefact.price}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === "processing" && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-8 text-center flex flex-col items-center"
                    >
                      <div className="relative w-14 h-14 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
                      </div>
                      <div className="text-yellow-400 font-semibold mb-2">
                        Processing Payment
                      </div>
                      <div className="text-gray-400 text-sm">
                        Simulating secure transaction...
                      </div>
                      <div className="w-3/4 h-1 mt-6 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-yellow-400"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="py-6 text-center space-y-3"
                    >
                      <div className="text-3xl font-bold text-green-400">
                        ✓ Payment Successful
                      </div>
                      <p className="text-sm text-gray-300">
                        Transaction ID:{" "}
                        <span className="font-mono text-yellow-300">
                          {txId}
                        </span>
                      </p>
                      <div className="mt-4 bg-zinc-900/60 border border-yellow-400/20 rounded-xl p-4 text-left text-sm text-gray-300">
                        <div>
                          <strong>Item:</strong> {artefact.name}
                        </div>
                        <div>
                          <strong>Amount:</strong> ₹{artefact.price}
                        </div>
                        <div>
                          <strong>Eco Impact:</strong> +1 Tree 🌱
                        </div>
                      </div>

                      <div className="mt-6 flex justify-center gap-3">
                        <Button
                          onClick={() => setOpen(false)}
                          className="bg-yellow-400 text-black hover:bg-yellow-300"
                        >
                          Done
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const receipt = `Receipt\nTransaction: ${txId}\nItem: ${artefact.name}\nAmount: ₹${artefact.price}`;
                            const blob = new Blob([receipt], {
                              type: "text/plain;charset=utf-8",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${txId}_receipt.txt`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                        >
                          Download Receipt
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* quick info row under CTA */}
            <div className="mt-6 text-sm text-gray-400">
              <div>
                By claiming you support our eco missions — a small part of
                proceeds plants trees and funds recycling.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Eco Impact Stats (same as before) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-20 grid sm:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Trees className="w-10 h-10 text-green-400" />,
              label: "Trees Planted",
              value: "3",
            },
            {
              icon: <Recycle className="w-10 h-10 text-blue-400" />,
              label: "Plastic Recycled",
              value: "1.2kg",
            },
            {
              icon: <Globe className="w-10 h-10 text-teal-400" />,
              label: "Carbon Saved",
              value: "0.8kg",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-black/60 border border-yellow-400/30 text-center rounded-3xl shadow-2xl hover:scale-105 transition-transform"
            >
              <CardContent className="flex flex-col items-center p-8">
                <div className="mb-4">{stat.icon}</div>
                <h4 className="text-2xl font-bold text-yellow-400">
                  {stat.value}
                </h4>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Related artefacts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-24"
        >
          <h2 className="text-3xl font-display font-extrabold text-yellow-400 mb-10 text-center">
            Related Artefacts
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(artefacts)
              .flat()
              .filter((a) => a.id !== artefact.id)
              .slice(0, 3)
              .map((a) => (
                <ProductCard
                  key={a.id}
                  artefact={{
                    ...a,
                    id: a.id.toString(),
                    rarity: a.rarity as "Common" | "Rare" | "Legendary",
                  }}
                />
              ))}
          </div>
        </motion.div>
      </div>

      {/* Small loader styles (very small) */}
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          border: 5px solid rgba(255, 255, 255, 0.08);
          border-top-color: rgba(253, 224, 71, 0.9);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(253, 224, 71, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(253, 224, 71, 0.7);
          }
        }
        .glow {
          animation: glow 2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default ProductDetailPage;
