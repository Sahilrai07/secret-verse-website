import {
  Award,
  Clock,
  Gift,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export const faqs = [
  {
    question: "How do scratch cards work?",
    answer:
      "Simply purchase a ticket for any contest, and you'll get a digital scratch card. Scratch off the surface to reveal your prize - every ticket guarantees either a cash prize or an exciting product!",
  },
  {
    question: "What are the chances of winning?",
    answer:
      "Every ticket is a guaranteed win! You have a 30% chance of winning cash prizes ranging from ₹100 to ₹50,000, and a 70% chance of winning amazing products like electronics, accessories, and more.",
  },
  {
    question: "How do I receive my prizes?",
    answer:
      "Cash prizes are credited to your account instantly. Physical products are shipped to your registered address within 3-5 business days. All shipping is free!",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "We use bank-grade encryption and secure payment gateways. Your card details are never stored on our servers, ensuring complete security.",
  },
  {
    question: "Can I buy multiple tickets?",
    answer:
      "Yes! You can purchase up to 10 tickets per contest. Each ticket gives you an independent chance to win, increasing your overall winning potential.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with your experience, contact our support team within 24 hours for a full refund.",
  },
];

export const products = [
  {
    name: "Bluetooth Earbuds",
    image: "/placeholder.svg?height=200&width=200&text=Earbuds",
    value: "₹2,999",
  },
  {
    name: "Wireless Mouse",
    image: "/placeholder.svg?height=200&width=200&text=Mouse",
    value: "₹1,499",
  },
  {
    name: "Power Bank",
    image: "/placeholder.svg?height=200&width=200&text=PowerBank",
    value: "₹2,499",
  },
  {
    name: "Smart Watch",
    image: "/placeholder.svg?height=200&width=200&text=Watch",
    value: "₹8,999",
  },
  {
    name: "Wireless Charger",
    image: "/placeholder.svg?height=200&width=200&text=Charger",
    value: "₹1,999",
  },
  {
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=200&width=200&text=Speaker",
    value: "₹3,999",
  },
];

export const contests = [
  {
    name: "Golden Jackpot",
    ticketPrice: 50,
    maxPrize: "₹10,000",
    participants: "2.5K+",
    image: "/placeholder.svg?height=300&width=400&text=Golden+Jackpot",
  },
  {
    name: "Tech Bonanza",
    ticketPrice: 100,
    maxPrize: "₹25,000",
    participants: "1.8K+",
    image: "/placeholder.svg?height=300&width=400&text=Tech+Bonanza",
  },
  {
    name: "Mega Prize",
    ticketPrice: 200,
    maxPrize: "₹50,000",
    participants: "950+",
    image: "/placeholder.svg?height=300&width=400&text=Mega+Prize",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Choose Your Contest",
    description:
      "Browse through our exciting contests and pick the one that catches your eye.",
    icon: Trophy,
  },
  {
    step: 2,
    title: "Buy Your Ticket",
    description:
      "Select the number of tickets and complete your secure payment.",
    icon: Gift,
  },
  {
    step: 3,
    title: "Scratch & Win",
    description: "Scratch your digital card to reveal your guaranteed prize!",
    icon: Star,
  },
  {
    step: 4,
    title: "Claim Your Prize",
    description:
      "Enjoy your cash prize instantly or receive your product within days.",
    icon: Award,
  },
];

export const features = [
  {
    icon: Shield,
    title: "100% Secure",
    description:
      "Bank-grade security and encrypted payments ensure your data is always safe.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Scratch and win instantly! No waiting, no delays - immediate gratification.",
  },
  {
    icon: Award,
    title: "Guaranteed Wins",
    description:
      "Every single ticket is a winner. Cash prizes or amazing products - you always win!",
  },
];

export const states = [
  { number: "50K+", label: "Happy Winners", icon: Users },
  { number: "₹2.5Cr+", label: "Prizes Distributed", icon: Trophy },
  { number: "100%", label: "Guaranteed Wins", icon: Star },
  { number: "24/7", label: "Customer Support", icon: Clock },
];
